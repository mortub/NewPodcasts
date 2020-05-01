import PlayerStore from "./PlayerStore";

class RootStore {
    playerStore : PlayerStore;

    constructor() {
        this.playerStore = new PlayerStore(this);
        
    }
};

//creating a new store
export const rootStore = new RootStore();

export default RootStore;