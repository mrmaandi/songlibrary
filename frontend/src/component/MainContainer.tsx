import * as React from "react";
import Container from "./Container";
import AddNewSongComponent from "./AddNewSongComponent";
import SongComponent from "./SongComponent";
import LibraryComponent from "./LibraryComponent";
import Footer from "./Footer";
import Header from "./Header";
import { observer, Provider } from "mobx-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RootStore from "../store/RootStore";

interface MainContainerState {
  rootStore: RootStore;
}

@observer
class MainContainer extends React.Component<{}, MainContainerState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      rootStore: new RootStore()
    }
  }

  public render() {
    return (
      <Router>
        <div>
          <Provider store={this.state.rootStore}>
            <Header />
            <Switch>
              <div className="container">
                <Route exact path="/" component={Container} />
                <Route path="/new" component={AddNewSongComponent} />
                <Route path="/song/:id" component={SongComponent} />
                <Route path="/library" component={LibraryComponent} />
              </div>
            </Switch>
            <Footer />
          </Provider>
        </div>
      </Router>
    );
  }
}

export default MainContainer;
