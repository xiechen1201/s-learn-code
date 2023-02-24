export default {
  namespaced: true,
  state: () => ({
    userName: "张三"
  }),
  getters: {
    nameSplit(state) {
      console.log(arguments);
      return state.userName.split("-");
    }
  }
};
