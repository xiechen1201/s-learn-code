import Ref from "./Ref.js";

// 该正则表达式可以匹配到 {{ xxx }}
const reg_var = /\{\{(.+?)\}\}/;

export function ref(initialValue) {
  return new Ref(initialValue);
}

export function createRefMap(allNodes, refs) {
  allNodes.forEach((node) => {
    if (reg_var.test(node.innerText)) {
      const refKey = node.innerText.match(reg_var)[1].trim();
      refs[refKey].deps.add(node);
    }
  });

  return refs;
}
