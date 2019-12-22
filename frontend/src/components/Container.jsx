import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class Container extends React.Component {
    state = {
        searchResult: [{word: '', count: 0}],
        searchSongs: [{id: 0, title: '', lyrics: ''}],
        songs: [],
        mostused: [],
        searchTerm: '',
        title: '',
        lyrics: '',
        newSongAdded: false
    };

    componentDidMount() {
        axios.get(`http://localhost:8080/api/mostused`)
            .then(res => {
                const data = res.data;
                this.setState({ mostused: data });
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-4 mb-4">
                    <div className="col-md-12">
                        <h3 className="text-center"><a href="http://localhost:8081/">Song Word Frequency Search Library Prototype</a></h3>
                    </div>
                    <div className="col-md-8 offset-md-2">
                        <div className="row">
                            <div className="col-md-9">
                                <input className="form-control mr-sm-2" type="search" name="searchterm" placeholder="Search"
                                       aria-label="Search" value={this.state.searchTerm} onChange={
                                    (env) => this.setState({searchTerm: env.target.value})
                                }/>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-primary btn-block" type="button"
                                        onClick={() => this.getData()}>Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        I have found <b>{this.state.searchResult.count}</b> occurances of the word <b>{this.state.searchResult.word}</b>.<br/>
                        The words can be found in the following song lyrics: <br/><br/>

                        {this.state.searchSongs.map((song) =>
                            <React.Fragment>
                                <p><b>{song.title}</b><br/>
                                <small>{song.lyrics}</small></p>
                            </React.Fragment>
                        )}
                    </div>
                    <div className="col-md-4">
                        <h3>Add new song</h3>
                        <input className="form-control mr-sm-2" type="text" name="title" placeholder="title" value={this.state.title} onChange={
                            (env) => this.setState({title: env.target.value})
                        }/>
                        <input className="form-control mr-sm-2" type="text" name="lyrics" placeholder="lyrics" value={this.state.lyrics} onChange={
                            (env) => this.setState({lyrics: env.target.value})
                        }/>
                        <button className="btn btn-primary btn-block" type="button" onClick={() => this.addSong()}>Add song</button>
                        <br/>
                        {this.state.newSongAdded && <p>New song added!</p>}


                        <h3>Most used words</h3>
                        {this.state.mostused.slice(0, 20).map((mostused) =>
                            <React.Fragment>
                                <p><b>{mostused.word}</b>: <small>{mostused.count}</small></p>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    getData() {
        axios.get(`http://localhost:8080/api/search?searchTerm=${this.state.searchTerm}`)
            .then(res => {
                const data = res.data;
                this.setState({searchResult: data});
            });
        axios.get(`http://localhost:8080/api/songsbyterm?searchTerm=${this.state.searchTerm}`)
            .then(res => {
                const data = res.data;
                this.setState({searchSongs: data});
            });
    }

    addSong() {
        axios.post(`http://localhost:8080/api/addsong?title=${this.state.title}`, this.state.lyrics,
            {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then(() => {
                this.setState({newSongAdded: true});
            })
    }
}

export default Container;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Container/>, wrapper) : false;