import { action, observable } from 'mobx';
import RootStore from './RootStore';
//caching
import AsyncStorage from '@react-native-community/async-storage';
import { Cache } from "react-native-cache";


class CachingStore {
    rootStore: RootStore;

    @observable
    public cachePodcast : Cache;

    //TODO:may on another store...
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

    @action
    public async set(podcast){
        await this.cachePodcast.set(podcast.title, podcast);
    }

    @action
    public async get(key){
        const value = await this.cachePodcast.get(key);
         return value;       
    }

    @action 
    public async remove(key){
        await this.cachePodcast.remove(key);
    }

    @action
    public async peek(key){
        const value = await this.cachePodcast.peek(key);
        return value;
    }

    @action 
    public async getAll(){
        const entries = await this.cachePodcast.getAll();
        return entries;
    }

    @action
    public async clearAll(){
        await this.cachePodcast.clearAll();
    }
};


export default CachingStore;