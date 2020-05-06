import { action, observable } from 'mobx';
import RootStore from './RootStore';
import TrackPlayer, {STATE_PLAYING, STATE_PAUSED} from 'react-native-track-player';
import PlayerService from '../services/PlayerService';


TrackPlayer.registerPlaybackService( () => PlayerService);

class PlayerStore {    
    rootStore: RootStore;
    
   
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        TrackPlayer.setupPlayer()
        this.turnIsPlaying();           
        
    }


    @observable
    public isPlaying = false;

    @observable
    public currentTrack = undefined;

   

    @action
    public getCurrentTrack(){
      return this.currentTrack;
    }

    @action
    public async reset(){
            await TrackPlayer.reset();
    }
    
    @action
    public async add(track){
        
         await TrackPlayer.add({
                id: track.id,
                url: track.url,
                title: track.title,
                artwork: track.artwork,
                artist: track.artist,
                description:track.description,
                duration: track.duration,
            });
    
        this.currentTrack = track;
    }
    
    @action
    public async play() {
        await TrackPlayer.play();
    };

    @action
    public async pause() {
        await  TrackPlayer.pause();
    };

    @action
    public async skip10SecondsForward(){
        this.pause();
        await this.getPosition()
        .then(async (position) =>{
           await TrackPlayer.seekTo(position +10);
        });
        this.play();
    };

    @action 
    public async skip10SecondsBack(){
        this.pause();
        await this.getPosition()
        .then(async (position) =>{
            var pos=position-10 ;
            if(pos>10){
                await TrackPlayer.seekTo(position-10);
            }          
        });
        this.play();
    };

    @action
    public turnIsPlaying(){
        TrackPlayer.addEventListener('playback-state',async (state) =>{
            
            if(state.state == STATE_PLAYING ){
                this.isPlaying = true;
            }
           
            if(state.state == STATE_PAUSED){
                this.isPlaying = false;
            }
        });
    };

    @action
    public async getDuration(){
       return await TrackPlayer.getDuration();
    };

    @action
    public async getPosition(){
        return await TrackPlayer.getPosition()
    
    };

    @action
    public async seekTo(seconds){
       return await TrackPlayer.seekTo(seconds);
    };


};

export default PlayerStore;