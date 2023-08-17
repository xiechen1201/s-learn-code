import { render, setAttrs } from "./virtualDom.js";

let finalPatcher = {};
let rnIndex = 0;

function doPatch(rDom, patches) {
  finalPatcher = patches;
  rNodeWalk(rDom);
}

function rNodeWalk(rDom) {
  const rnPatch = finalPatcher[rnIndex++];
  const childNodes = rDom.childNodes;

  if (rnPatch) {
    patchAction(rDom, rnPatch);
  }

  [...childNodes].forEach((c) => {
    rNodeWalk(c);
  });
}

function patchAction(rDom, rnPatch) {
  rnPatch.map((el) => {
    switch (el.type) {
      case "ATTR":
        for (const key in el.attrs) {
          const value = el.attrs[key];

          if (value) {
            setAttrs(rDom, key, value);
          } else {
            rDom.removeAttribute(key);
          }
        }
        break;
      case "TEXT":
        rDom.innerText = el.text;
        break;
      case "REPLACE":
        const newNode =
          el.newNode instanceof Element
            ? render(el.newNode)
            : document.createTextNode(el.newNode);

        rDom.parentNode.replaceChild(newNode, rDom);
        break;
      case "REMOVE":
        rDom.parentNode.removeChild(rDom);
        break;
    }
  });
}

export { doPatch };
