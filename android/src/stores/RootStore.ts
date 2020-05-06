import PlayerStore from "./PlayerStore";
import CachingStore from "./CachingStore";
import MyListStore from "./MyListStore";


class RootStore {
    playerStore : PlayerStore;
    cachingStore: CachingStore;
    myListStore: MyListStore;

    constructor() {
        this.playerStore = new PlayerStore(this);
        this.cachingStore = new CachingStore(this);
        this.myListStore = new MyListStore(this);
        
    }
};

//creating a new store
export const rootStore = new RootStore();

export default RootStore;