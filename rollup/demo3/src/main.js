import { createApp } from "vue";

export default function () {
    import("./foo.js").then(({ default: foo }) => console.log(foo));
}

createApp({}).mount("#app");