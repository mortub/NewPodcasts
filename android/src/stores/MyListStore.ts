import { action, observable } from 'mobx';
import RootStore from './RootStore';

//the type saved in array of podcasts
type track =
     { 
        id: string;
        url: string;
        title: string;
        artwork: string;
        artist: string;
        description: string;
        rssUrl: string;
};

//saves all the podcasts the user added to my list
class MyListStore{
    rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @observable
    public myList = Array<track>();

    //adds a track to array
    @action
    public addTrack(track){
        //don't add track if already in list
        var num =this.myList.find((t) => t.id === track.id)
        if(num !== undefined){
            return;
        }
        this.myList.push(track);   
    }

    //deletes a track from array
    @action
    public DeleteTrack(track){
        //delete the track from myList
        let newArray= this.myList.filter((t) => t.id !== track.id);
        this.myList = newArray;
    }
   
};

export default MyListStore;