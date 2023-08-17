import VueTest from "../Vue";

const vm = new VueTest({
  el: "#app",
  template: `
    <div>
      <img v-if="isShowImg1" src="https://cdn.pixabay.com/photo/2022/11/15/04/54/automotive-7593064__340.jpg" />
      <img v-show="isShowImg2" src="https://cdn.pixabay.com/photo/2022/12/15/18/15/christmas-7658297__340.jpg" />
    </div>
    <button @click="showImg1">显示图片1</button>
    <button @click="showImg2">显示图片2</button>
  `,
  data() {
    return {
      isShowImg1: false,
      isShowImg2: false
    };
  },
  methods: {
    showImg1() {
      this.isShowImg1 = !this.isShowImg1;
    },
    showImg2() {
      this.isShowImg2 = !this.isShowImg2;
    }
  }
});
