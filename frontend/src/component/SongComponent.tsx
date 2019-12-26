import * as React from "react";
import axios from "axios";

interface SongComponentProps {
  match: any;
}

interface SongComponentState {
  song: any;
}

class SongComponent extends React.Component<SongComponentProps, SongComponentState> {
  constructor(props: SongComponentProps) {
    super(props);
    this.state = {
      song: []
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    axios.get(`http://localhost:8080/api/songbyid?id=${params.id}`).then(res => {
      const data = res.data;
      this.setState({ song: data });
    });
  }

  public render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h3>
            {this.state.song.title}
          </h3>
          <p>
            {this.state.song.lyrics}
          </p>
        </div>
      </div>
    );
  }
}

export default SongComponent;
