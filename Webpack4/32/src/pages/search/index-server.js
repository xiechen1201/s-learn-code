import React from "react";
import ReactDOM from "react-dom";

import templateImg from "../../images/template.jpeg";

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

// ReactDOM.render(<Search />, document.getElementById("root"));
module.exports = Search;
