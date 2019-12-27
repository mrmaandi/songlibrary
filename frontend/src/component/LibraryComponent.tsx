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
      <div className="row">
        <div className="col-md-12">
          <h3>Library</h3>
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Artist</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {this.state.library.map((song: any, index: number) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={"/song/" + song.id}>{song.title}</Link>{" "}
                  </td>
                  <td>{song.artist.name}</td>
                  <td>
                    <i
                      className="fas fa-trash"
                      onClick={() => this.deleteSong(song.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
