import { useDom, useReactive } from "./mvvm";

function App() {
  const state = useReactive({
    count: 0,
    name: "Testname"
  });

  const add = function (num) {
    state.count += num;
  };

  const minus = function (num) {
    state.count -= num;
  };

  const changeName = function (name) {
    state.name = name;
  };

  return {
    template: `
        <h1>{{ count }}</h1>
        <h1>{{ name }}</h1>
        <button onClick="add(2)">新 增</button>
        <button onClick="minus(1)">减 去</button>
        <button onClick="changeName('xiechen')">更改名字</button>
    `,
    state,
    methods: {
      add,
      minus,
      changeName
    }
  };
}

useDom(App(), document.querySelector("#app"));
