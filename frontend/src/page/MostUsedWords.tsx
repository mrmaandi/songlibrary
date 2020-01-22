import * as React from "react";
import axios from "axios";

interface MostUsedWordsComponentState {
  mostUsed: any;
}

class MostUsedWords extends React.Component<{}, MostUsedWordsComponentState> {
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
          <h3>Most used words (top 100)</h3>
          <table className="table table-striped table-sm">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Word</th>
              <th scope="col">Count</th>
            </tr>
            </thead>
            <tbody>
            {this.state.mostUsed
              .slice(0, 100)
              .map((mostUsed: any, index: number) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{mostUsed.word.toLowerCase()}</td>
                  <td>{mostUsed.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MostUsedWords;
