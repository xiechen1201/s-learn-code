function render(refsMap) {
  for (const key in refsMap) {
    _render(refsMap[key]);
  }
}

function _render({ deps, value }) {
  deps.forEach((el) => {
    el.innerText = value;
  });
}

function update(ref) {
  _render(ref);
}

export { render, update };
