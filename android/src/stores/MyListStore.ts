import { action, observable } from 'mobx';
import RootStore from './RootStore';

type track =
     { 
        id: string;
        url: string;
        title: string;
        artwork: string;
        artist: string;
        description: string;
};

class MyListStore{
    rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @observable
    public myList = Array<track>();


    @action
    public addTrack(track){
        //don't add track if already in list
        var num =this.myList.find((t) => t.id === track.id)
        if(num !== undefined){
            return;
        }
        this.myList.push(track);   
    }

    @action
    public DeleteTrack(track){
        //delete the track from myList
        let newArray= this.myList.filter((t) => t.id !== track.id);
        this.myList = newArray;
    }



    
    
    

    
};

export default MyListStore;