import foo from "./foo.js";
import { version } from "../package.json";

export default function () {
    console.log(version);
    console.log(foo);
}
