import { ref, createRefMap } from "./hooks.js";
import { render } from "./render.js";
import { bindEvent } from "./event.js";

function createApp(el, { refs, methods }) {
  const $el = document.querySelector(el);
  const allNodes = $el.querySelectorAll("*");
  const refsMap = createRefMap(allNodes, refs);

  render(refsMap);
  bindEvent.apply(refsMap, [methods, allNodes]);
}

export { createApp, ref };
