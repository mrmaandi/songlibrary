import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface LibraryComponentState {
  library: any;
}

class LibraryComponent extends React.Component<{}, LibraryComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      library: []
    };
  }

  componentDidMount() {
    this.getLibrary();
  }

  public render() {
    return (
      <div className="col-md-12">
        <h3>Library</h3>
        {this.state.library.map((song: any, index: number) => (
          <div>
            {index + 1}. <Link to={"/song/" + song.id}>{song.title}</Link> <i className="fas fa-trash" onClick={() => this.deleteSong(song.id)}/>
          </div>
        ))}
      </div>
    );
  }

  private getLibrary() {
    axios.get(`http://localhost:8080/api/songs`).then(res => {
      const data = res.data;
      this.setState({ library: data });
    });
  }

  private deleteSong(id: number) {
    axios.delete(`http://localhost:8080/api/deletesong?id=${id}`).then(res => {
      this.getLibrary();
    });
  }
}

export default LibraryComponent;
