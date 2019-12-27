import {action, observable} from "mobx";

export default class SearchStore {
  @observable
  public searchResult: any = [];
  @observable
  public searchSongs: any = [];
  @observable
  public searchTerm: string = "";

  @action
  public setSearchTerm = (value: string) => {
    this.searchTerm = value;
  };

  @action
  public setSearchResult = (data: any) => {
    this.searchResult = data;
  };

  @action
  public setSearchSongs = (data: any) => {
    this.searchSongs = data;
  };
}
