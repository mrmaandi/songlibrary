import * as React from "react";
import axios from "axios";

interface MostUsedWordsComponentState {
  mostUsed: any;
}

class MostUsedWordsComponent extends React.Component<{}, MostUsedWordsComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      mostUsed: []
    };
  }

  public componentDidMount() {
    axios.get(`http://localhost:8080/api/mostused`).then(res => {
      const data = res.data;
      this.setState({ mostUsed: data });
    });
  }

  public render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h3>Most used words (top 50)</h3>
          <p>
            {this.state.mostUsed
              .slice(0, 50)
              .map((mostUsed: any, index: number) => (
                <span key={index}>
                  <b>{mostUsed.word.toLowerCase()}</b> (
                  <small>{mostUsed.count}</small>),&nbsp;
                </span>
              ))}
          </p>
        </div>
      </div>
    );
  }
}

export default MostUsedWordsComponent;
