import observe from "./observe.js";

function observeArr(data) {
  data.forEach((element) => {
    observe(element);
  });
}

export default observeArr;
