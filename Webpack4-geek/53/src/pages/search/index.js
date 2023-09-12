import React from "react";
import ReactDOM from "react-dom";
import { reverse } from "../../utils/index";
import { a } from "./tree-shaking";

import "./search.less";
import templateImg from "../../images/template.jpeg";

console.log(reverse([4, 5, 6]));
console.log(a());

class Search extends React.Component {
  loadComponent() {
    import("./test").then((text) => {
      console.log(text);
    });
  }

  render() {
    return (
      <div className="search-text">
        <span>Search Text Content</span>
        <img src={templateImg} />
        <button onClick={this.loadComponent.bind(this)}>点击进行加载</button>
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
