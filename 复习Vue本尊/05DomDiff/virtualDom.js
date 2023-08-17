import Element from "./Element.js";

function createElement(type, props, children) {
  return new Element(type, props, children);
}

function setAttrs(el, key, value) {
  switch (key) {
    case "value":
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.value = value;
      } else {
        el.setAttribute(key, value);
      }
      break;
    case "style":
      el.style.cssText = value;
      break;
    default:
      el.setAttribute(key, value);
      break;
  }
}

function render(vDom) {
  const { type, props, children } = vDom;

  const el = document.createElement(type);

  for (const key in props) {
    setAttrs(el, key, props[key]);
  }

  children.map((c) => {
    c = c instanceof Element ? render(c) : document.createTextNode(c);
    el.appendChild(c)
  });

  return el;
}

function renderDOM(rootElement, rDom) {
  rootElement.appendChild(rDom);
}

export { createElement, render, renderDOM,setAttrs };
