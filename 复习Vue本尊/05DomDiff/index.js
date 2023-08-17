import { createElement, render, renderDOM } from "./virtualDom.js";
import { domDiff } from "./domDiff.js";
import { doPatch } from "./doPatch.js";

let vDom = createElement(
  "ul",
  {
    class: "list",
    style: "width: 300px; height: 300px; background-color: orange"
  },
  [
    createElement("li", { class: "item", "data-index": 0 }, [
      createElement("p", { class: "text" }, ["第1个列表项"])
    ]),
    createElement("li", { class: "item", "data-index": 1 }, [
        // createElement("p", { class: "title" }, ["第2个列表项"])
      createElement("p", { class: "text" }, [
        createElement("span", { class: "title" }, ["第2个列表项"])
      ])
    ]),
    createElement("li", { class: "item", "data-index": 2 }, ["第3个列表项"])
  ]
);

const newVdom = createElement(
  "ul",
  {
    class: "list-wrap",
    style: "width: 300px; height: 300px; background-color: orange"
  },
  [
    createElement("li", { class: "item", "data-index": 0 }, [
      createElement("p", { class: "title" }, ["特殊列表项"])
    ]),
    createElement("li", { class: "item", "data-index": 1 }, [
      createElement("p", { class: "text" }, [
        // span 进行了删除
      ])
    ]),
    createElement("div", { class: "item", "data-index": 2 }, ["第3个列表项"])
  ]
);

let rDom = render(vDom);
renderDOM(document.querySelector("#app"), rDom);

const patch = domDiff(vDom, newVdom);
doPatch(rDom, patch);
