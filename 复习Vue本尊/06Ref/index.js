import { createApp, ref } from "./vue/index.js";

createApp("#app", {
  refs: {
    title: ref("This is title."),
    content: ref("This is content.")
  },
  methods: {
    setTitle() {
      this.title.value = "这是标题。";
    },
    setContent() {
      this.content.value = "这是内容。";
    },
    reset() {
      this.title.$reset();
      this.content.$reset();
    }
  }
});
