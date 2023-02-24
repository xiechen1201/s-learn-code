import { createStore } from "vuex";
import user from "./modules/user";

const store = createStore({
  modules: {
    user
  },
  state: () => ({
    count: 1,
    userName: "张三",
    todos: [
      {
        content: "任务1",
        done: false
      },
      {
        content: "任务2",
        done: true
      },
      {
        content: "任务3",
        done: true
      }
    ]
  }),
  getters: {
    doneTodos(state, getters) {
      console.log("getters", getters);
      return state.todos.filter((el) => el.done).length;
    },
    doneTodosReverse(state) {
        console.log(state)
      return state.todos.reverse();
    }
  },
  mutations: {
    increment(state, n) {
      state.count += n;
    }
  },
  actions: {
    increment(context) {
      console.log(context);
    }
  }
});

console.log(store)

export default store;
