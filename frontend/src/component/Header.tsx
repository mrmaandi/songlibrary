import * as React from "react";
import {
  Link
} from "react-router-dom";

class Header extends React.Component {
  public render() {
    return (
      <div className="container">
        <div className="row mt-4 mb-4">
          <div className="col-md-12 text-center">
            <h3>
              <Link to="/">
                Song Word Frequency Search Library Prototype
              </Link>
            </h3>
            <Link to="/library">Library</Link>&nbsp;
            <Link to="/new">Add new song</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
