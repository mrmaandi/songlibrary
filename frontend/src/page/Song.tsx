import * as React from "react";
import axios from "axios";

interface SongComponentProps {
  match: any;
}

interface SongComponentState {
  song: any;
}

class Song extends React.Component<
  SongComponentProps,
  SongComponentState
> {
  constructor(props: SongComponentProps) {
    super(props);
    this.state = {
      song: []
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    axios
      .get(`http://localhost:8080/api/songbyid?id=${params.id}`)
      .then(res => {
        const data = res.data;
        this.setState({ song: data });
      });
  }

  public render() {
    return (
      <div className="row">
        <div className="col-md-12">
          {this.state.song.lyrics && (
            <div className="text-center">
              <h3>{this.state.song.title}</h3>
              {this.state.song.lyrics.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Song;
