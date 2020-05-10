import { action, observable } from 'mobx';
import RootStore from './RootStore';
import { addToList, searchDocIdFromList,
     deleteFromList, showEpisodesFromMyList } from '../utils/FirestoreFetches';

//saves all the podcasts the user added to my list
class MyListStore{
    rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @observable
    public myList :any[] = [];

     //checks if the given track is on the list
     @action
     public checkIsTrackOnList(track){
         var num =this.myList.find((t) => t.id === track.id)
         if(num !== undefined){
             return true;
         }
         else{
             return false;
         }      
     }

    //adds a track to array
    @action
    public addTrack(track){
        //don't add track if already in list
        if(this.checkIsTrackOnList(track)){
            return;
        }
        
        this.myList.push(track);
        //adding to the database too
        addToList(track);   
    }

    //deletes a track from array
    @action
    public DeleteTrack(track){
        //delete the track from myList
        let newArray= this.myList.filter((t) => t.id !== track.id);
        this.myList = newArray;
        //searching in dband deleting
        searchDocIdFromList(track)
        .then((docId)=>{
            deleteFromList(docId);
        })
    }

    //on app upload - adds to array from db all of the user's tracks
    @action
    public GetAllTracks(){       
        return this.myList;
    }

    //gets all the user's tracks from the db
    @action
    public async fromDbToLocalList(){
        await showEpisodesFromMyList()
        .then((l)=>{
            this.myList = l;
        })
    }  
   
};

export default MyListStore;