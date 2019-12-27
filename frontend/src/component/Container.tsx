import * as React from "react";
import axios from "axios";
import MostUsedWordsComponent from "./MostUsedWordsComponent";
import { inject, observer } from "mobx-react";
import SearchStore from "../store/SearchStore";

interface ContainerProps {
  searchStore?: SearchStore;
}

@inject("searchStore")
@observer
class Container extends React.Component<ContainerProps, {}> {
  constructor(props: ContainerProps) {
    super(props);
  }

  public render() {
    const { searchStore } = this.props;

    return (
      <>
        <div className="row mt-2">
          <div className="col-md-12">
            {searchStore.searchResult.length > 0 && (
              <>
                <p>
                  Did you mean&nbsp;
                  {searchStore.searchResult.map(result => (
                    <>
                      <b>{result.word}</b> ({result.count}){" "}
                    </>
                  ))}
                  <br />
                </p>
              </>
            )}

            {searchStore.searchResult[0] && searchStore.searchResult[0].word && (
              <>
                I have found <b>{searchStore.searchResult[0].count}</b>{" "}
                occurances of the word <b>{searchStore.searchResult[0].word}</b>
                .
                <br />
              </>
            )}

            {searchStore.searchSongs.length > 0 && (
              <>
                The word can be found in the following song lyrics: <br />
                <br />
              </>
            )}

            {searchStore.searchSongs.map(song => (
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
}

export default Container;
