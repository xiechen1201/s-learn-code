import { eventFormat, stateFormat, statePool, bindEvent } from "../compiler";

function useDom({ template, state, methods }, rootDOM) {
  rootDOM.innerHTML = render(template, state);
  bindEvent(methods);
}

function render(template, state) {
  template = eventFormat(template);
  template = stateFormat(template, state);

  return template;
}

function update(key, newValue) {
  const allElements = document.querySelectorAll("*");
  let oItem = null;

  console.log(statePool)

  statePool.forEach((el) => {
    if (el.state.includes(key)) {
      for (let i = 0; i < allElements.length; i++) {
        oItem = allElements[i];
        const _mark = parseInt(oItem.dataset.mark);

        if (el.mark === _mark) {
          oItem.innerHTML = newValue;
        }
      }
    }
  });
}

export { useDom, update };
