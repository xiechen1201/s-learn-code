import React from "react";
import ReactDOM from "react-dom";
import { reverse } from "../../utils/index";
import { a } from "./tree-shaking";

import "./search.less";
import templateImg from "../../images/template.jpeg";

console.log(reverse([4, 5, 6]));
console.log(a());

class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        <span>Search Text Content</span>
        <img src={templateImg} />
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
