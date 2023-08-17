import Observer from "./Observer.js"

function observe(data) {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  return new Observer(data);
}

export default observe;
