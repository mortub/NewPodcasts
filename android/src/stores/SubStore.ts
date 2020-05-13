import { action, observable } from 'mobx';
import RootStore from './RootStore';
import { addToSub, searchDocIdFromSub,
     deleteFromSub, showSubsFromSubscribers } from '../utils/FirestoreFetches';

class SubStore {
    rootStore: RootStore; c
    
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    
    @observable
    public subscribers :any[] = [];

     //checks if the given sub is on the subscribers list
     @action
     public checkIsSubOnSubList(sub){
         var num =this.subscribers.find((t) => t.rssUrl === sub.rssUrl)
         if(num !== undefined){
             return true;
         }
         else{
             return false;
         }      
     }

    //adds a sub to array
    @action
    public addSub(sub){
        //don't add track if already in list
        if(this.checkIsSubOnSubList(sub)){
            return;
        }
        
        this.subscribers.push(sub);
        //adding to the database too
       addToSub(sub.rssUrl, sub.title, sub.image);   
    }

    //deletes a subscriber from array
    @action
    public DeleteSub(sub){
        //delete the subscriber from subscribers
        let newArray= this.subscribers.filter((t) => t.rssUrl !== sub.rssUrl);
        this.subscribers = newArray;
        //searching in db and deleting
        searchDocIdFromSub(sub.title)
        .then((docId)=>{
            deleteFromSub(docId);
        })
    }

    //on app upload - adds to array from db all of the user's tracks
    @action
    public GetAllSubs(){       
        return this.subscribers;
    }

    //gets all the user's tracks from the db
    @action
    public async fromDbToLocalSubsList(){
        await showSubsFromSubscribers()
        .then((l)=>{
            this.subscribers = l;
        })
    }  
};

export default SubStore;