import { action, observable } from 'mobx';
import RootStore from './RootStore';
//caching
import AsyncStorage from '@react-native-community/async-storage';
import { Cache } from "react-native-cache";

//local cached memory
class CachingStore {
    rootStore: RootStore;

    @observable
    public cachePodcast : Cache;

    @observable
    public cacheCurrentEpisode : Cache;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;  
        
        this.cachePodcast = new Cache({
            namespace: "podcast",
            policy: {
                maxEntries: 50000
            },
            backend: AsyncStorage
        });        
    }

    //set podcast information in cache
    @action
    public async set(podcast){
        await this.cachePodcast.set(podcast.title, podcast);
    }

    //get cached podcast information
    @action
    public async get(key){
        const value = await this.cachePodcast.get(key);
         return value;       
    }

    //remove podcast information from cache
    @action 
    public async remove(key){
        await this.cachePodcast.remove(key);
    }

    //peek to see if that podcast was already cached
    @action
    public async peek(key){
        const value = await this.cachePodcast.peek(key);
        return value;
    }

    //get all podcasts in cache
    @action 
    public async getAll(){
        const entries = await this.cachePodcast.getAll();
        return entries;
    }

    //remove all podcasts in cache
    @action
    public async clearAll(){
        await this.cachePodcast.clearAll();
    }
};

export default CachingStore;