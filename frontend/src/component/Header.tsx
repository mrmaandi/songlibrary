import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { inject, observer } from "mobx-react";
import SearchStore from "../store/SearchStore";
import axios from "axios";

interface HeaderProps {
  searchStore?: SearchStore;
}

@inject("searchStore")
@observer
class Header extends React.Component<HeaderProps, {}> {
  constructor(props: HeaderProps) {
    super(props);
  }

  public render() {
    const { searchStore } = this.props;

    return (
      <>
        <div className="bg-light text-white">
          <div className="container">
            <div className="row pt-4 pb-4">
              <div className="col-md-12 text-center">
                <h3>
                  <i className="fas fa-book-open text-primary" />
                  &nbsp;
                  <Link to="/">
                    Song Word Frequency Search Library Prototype
                  </Link>
                </h3>
                <Link to="/library"><span className="badge badge-dark">Library</span></Link>&nbsp;
                <Link to="/mostused"><span className="badge badge-primary">Most used words</span></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark">
          <div className="container pb-4 pt-4 mb-2">
            <div className="row">
              <div className="col-md-8">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  name="searchterm"
                  placeholder="Search for keywords such as 'dreamland', 'headlights', ..."
                  aria-label="Search"
                  onChange={env => searchStore.setSearchTerm(env.target.value)}
                  onKeyDown={e => this.handleKeyDown(e)}
                />
              </div>
              <div className="col-md-4">
                <Link to="/">
                  <button
                    className="btn btn-primary btn-block"
                    type="button"
                    onClick={() => {
                      this.getSearchResultData();
                    }}
                  >
                    Search
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  private handleKeyDown(e) {
    if (e.key === "Enter") {
      this.getSearchResultData();
    }
  }

  private getSearchResultData() {
    const { searchStore } = this.props;

    axios
      .get(
        `http://localhost:8080/api/search?searchTerm=${searchStore.searchTerm}`
      )
      .then(res => {
        const data = res.data;
        searchStore.setSearchResult(data);
      });

    axios
      .get(
        `http://localhost:8080/api/songsbyterm?searchTerm=${searchStore.searchTerm}`
      )
      .then(res => {
        const data = res.data;
        searchStore.setSearchSongs(data);
      });
  }
}

export default Header;
