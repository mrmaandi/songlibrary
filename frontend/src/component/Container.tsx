import * as React from "react";
import axios from "axios";
import MostUsedWordsComponent from "./MostUsedWordsComponent";

interface ContainerState {
  searchResult: any;
  searchSongs: any;
  songs: any;
  searchTerm: string;
}

class Container extends React.Component<{}, ContainerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchResult: [],
      searchSongs: [],
      songs: [],
      searchTerm: ""
    };
  }

  public render() {
    return (
      <>
        <div className="row">
          <div className="col-md-8">
            <input
              className="form-control mr-sm-2"
              type="search"
              name="searchterm"
              placeholder="Search for keywords like 'dreamland'"
              aria-label="Search"
              value={this.state.searchTerm}
              onChange={env => this.setState({ searchTerm: env.target.value })}
              onKeyDown={(e) => this.handleKeyDown(e)}
            />
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-primary btn-block"
              type="button"
              onClick={() => this.getData()}
            >
              Search
            </button>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            {this.state.searchResult.length === 0 && (
                <MostUsedWordsComponent />
            )}

            {this.state.searchResult.length > 1 && (
              <>
                <p>
                  Did you mean&nbsp;
                  {this.state.searchResult.map(result => (
                    <>
                      <b>{result.word}</b> ({result.count}){" "}
                    </>
                  ))}
                  <br />
                </p>
              </>
            )}

            {this.state.searchResult[0] && this.state.searchResult[0].word && (
              <>
                I have found <b>{this.state.searchResult[0].count}</b>{" "}
                occurances of the word <b>{this.state.searchResult[0].word}</b>.
                <br />
              </>
            )}

            {this.state.searchSongs.length > 0 && (
              <>
                The word can be found in the following song lyrics: <br />
                <br />
              </>
            )}

            {this.state.searchSongs.map(song => (
              <React.Fragment>
                <p>
                  <b>{song.title}</b>
                  <br />
                  <small>{song.lyrics}</small>
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </>
    );
  }

  private handleKeyDown(e)  {
    if (e.key === 'Enter') {
      this.getData();
    }
  };

  private getData() {
    axios
      .get(
        `http://localhost:8080/api/search?searchTerm=${this.state.searchTerm}`
      )
      .then(res => {
        const data = res.data;
        this.setState({ searchResult: data });
      });
    axios
      .get(
        `http://localhost:8080/api/songsbyterm?searchTerm=${this.state.searchTerm}`
      )
      .then(res => {
        const data = res.data;
        this.setState({ searchSongs: data });
      });
  }
}

export default Container;
