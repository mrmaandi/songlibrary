import SearchStore from "./SearchStore";

class RootStore {
    private searchStore: SearchStore;

    constructor() {
        this.searchStore = new SearchStore();
    }
}

export default RootStore;