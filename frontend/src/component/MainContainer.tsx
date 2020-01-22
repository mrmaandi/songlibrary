import * as React from "react";
import Home from "../page/Home";
import NewTrack from "../page/NewTrack";
import Song from "../page/Song";
import Library from "../page/Library";
import Footer from "./Footer";
import Header from "./Header";
import { observer, Provider } from "mobx-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RootStore from "../store/RootStore";
import MostUsedWords from "../page/MostUsedWords";

interface MainContainerState {
  rootStore: RootStore;
}

@observer
class MainContainer extends React.Component<{}, MainContainerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rootStore: new RootStore()
    };
  }

  public render() {
    return (
      <Router>
        <Provider {...this.state.rootStore}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/new" component={NewTrack} />
              <Route path="/song/:id" component={Song} />
              <Route path="/library" component={Library} />
              <Route path="/mostused" component={MostUsedWords} />
            </Switch>
          </div>
          <Footer />
        </Provider>
      </Router>
    );
  }
}

export default MainContainer;
