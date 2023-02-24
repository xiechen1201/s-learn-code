<template>
  <div>
    {{ count }}
    {{ count2 }}
    {{ countPlusLocalState }}
    {{ userName }}
  </div>
  <div>
    {{ doneTodos }}
    {{ doneTodosReverse }}
  </div>
  <button @click="onClickBtn">新增 count</button>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    ...mapState({
      count1: (state) => state.count,
      count2: "count",
      countPlusLocalState(state) {
        return state.count++;
      }
    }),
    ...mapState(["userName"]),
    ...mapGetters({
      doneTodos: "doneTodos"
    }),
    ...mapGetters(["doneTodosReverse"])
  },
  methods: {
    onClickBtn() {
      this.$store.commit("increment", 3);
      /* this.$store.commit({
          type: "increment",
          num: 4
        }); */
    },
    add() {
      console.log(arguments);
    },
    ...mapMutations(["increment"]),
    ...mapMutations({
      add: "increment"
    })
  },
  mounted() {
    /* console.log(this.$store); */
    /* console.log("state", this.$store.state.count); */
    /* console.log("getters", this.$store.getters.doneTodos); */
  }
};
</script>

<style lang="scss" scoped></style>
