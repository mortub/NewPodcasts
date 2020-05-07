import PlayerStore from "./PlayerStore";
import CachingStore from "./CachingStore";
import MyListStore from "./MyListStore";

//saves all stores in one place
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