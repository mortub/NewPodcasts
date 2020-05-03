import { action, observable, decorate } from 'mobx';
import RootStore from './RootStore';
import TrackPlayer, {STATE_PLAYING, STATE_PAUSED} from 'react-native-track-player';
import PlayerService from '../services/PlayerService';

//TrackPlayer.registerPlaybackService( () => PlayerService);

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
    public changingTrack(){
        TrackPlayer.addEventListener('playback-track-changed', async (data)=>{
            console.log('from playerStore: track changed:', data)
        })
    }

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