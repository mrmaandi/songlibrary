import * as React from "react";
import axios from "axios";

interface AddNewSongComponentState {
  title: string;
  lyrics: string;
  newSongAdded: boolean;
}

class AddNewSongComponent extends React.Component<{}, AddNewSongComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      title: "",
      lyrics: "",
      newSongAdded: false
    };
  }

  public render() {
    return (
        <div className="col-md-12">
          <h3>Add new song</h3>
          <input
              className="form-control mr-sm-2"
              type="text"
              name="title"
              placeholder="Song title"
              value={this.state.title}
              onChange={env => this.setState({ title: env.target.value })}
          />
          <br />
          <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              name="lyrics"
              rows={5}
              placeholder="Lyrics"
              value={this.state.lyrics}
              onChange={env => this.setState({ lyrics: env.target.value })}
          />
          <br />
          <button
              className="btn btn-primary btn-block"
              type="button"
              onClick={() => this.addSong()}
          >
            Add song
          </button>
          <br />
          {this.state.newSongAdded && <p>New song added!</p>}
        </div>
    );
  }

  private addSong() {
    axios
        .post(
            `http://localhost:8080/api/addsong?title=${this.state.title}`,
            this.state.lyrics,
            {
              headers: {
                "Content-Type": "text/plain"
              }
            }
        )
        .then(() => {
          this.setState({ newSongAdded: true });
        });
  }
}

export default AddNewSongComponent;
