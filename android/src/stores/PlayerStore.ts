import { action, observable, decorate } from 'mobx';
import RootStore from './RootStore';
import TrackPlayer, {STATE_PLAYING, STATE_PAUSED} from 'react-native-track-player';
import PlayerService from '../services/PlayerService';

TrackPlayer.registerPlaybackService( () => PlayerService);



class PlayerStore {    
    rootStore: RootStore; 
   
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        TrackPlayer.setupPlayer().then(async () => {
            await TrackPlayer.add({
                id: 'trackId',
                url: 'https://media.whooshkaa.com/show/5817/episode/623483.mp3',
                title: 'Track Title',
                artist: 'Track Artist',
                //artwork: require('./track.png')
            });
        });
        this.turnIsPlaying();     
        
        
    }


    @observable
    public isPlaying = false;
    
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
            // this.getDuration();
            // this.getPosition();
            
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


};

export default PlayerStore;