import React from "react";
import ReactDOM from "react-dom";

import "./search.less"
import templateImg from "./images/template.jpeg"

class Search extends React.Component {
  render() {
    return <div className="search-text">
      <span>Search Text</span>
      <img src={ templateImg } />
    </div>;
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
