import { action, observable } from 'mobx';
import RootStore from './RootStore';
import TrackPlayer, {STATE_PLAYING, STATE_PAUSED} from 'react-native-track-player';
import PlayerService from '../services/PlayerService';

//registering track player to service - according to react-native-track-player
TrackPlayer.registerPlaybackService( () => PlayerService);
//saves the track player information and functionality
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

    //gets the current track that is playing
    @action
    public getCurrentTrack(){
      return this.currentTrack;
    }

    //resents the track player - nothing saved
    @action
    public async reset(){
            await TrackPlayer.reset();
    }
    
    //adds a track to the track player 
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
                rssUrl: track.rssUrl,
            });
    
        this.currentTrack = track;
    }
    
    //plays the current track
    @action
    public async play() {
        await TrackPlayer.play();
    };

    //pauses the current track
    @action
    public async pause() {
        await  TrackPlayer.pause();
    };

    //skips 10 seconds forward on the current track
    @action
    public async skip10SecondsForward(){
        this.pause();
        await this.getPosition()
        .then(async (position) =>{
           await TrackPlayer.seekTo(position +10);
        });
        this.play();
    };

    //skips 10 seconds back on the current track
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

    //listens to the track player state- if plays, shows it
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

    //gets the duration of current track
    @action
    public async getDuration(){
       return await TrackPlayer.getDuration();
    };

    //gets the position of current track
    @action
    public async getPosition(){
        return await TrackPlayer.getPosition()
    
    };

    //goes to the place on the track according to parameter
    @action
    public async seekTo(seconds){
       return await TrackPlayer.seekTo(seconds);
    };

};

export default PlayerStore;