let patches = {};
let vnIndex = 0;

function domDiff(oldVDom, newVDom) {
  let index = 0;

  vNodeWalk(oldVDom, newVDom, index);
  return patches;
}

function vNodeWalk(oldVDom, newVDom, index) {
  let vDomPatch = [];

  if (!newVDom) {
    vDomPatch.push({
      type: "REMOVE",
      index
    });
  } else if (typeof oldVDom === "string" && typeof newVDom === "string") {
    if (oldVDom !== newVDom) {
      vDomPatch.push({
        type: "TEXT",
        text: newVDom
      });
    }
  } else if (oldVDom.type !== newVDom.type) {
    vDomPatch.push({
      type: "REPLACE",
      newNode: newVDom
    });
  } else if (oldVDom.type === newVDom.type) {
    const attrPatch = attrsWalk(oldVDom.props, newVDom.props);

    if (Object.keys(attrPatch).length >= 0) {
      vDomPatch.push({
        type: "ATTR",
        attrs: attrPatch
      });
    }

    childWalk(oldVDom.children, newVDom.children);
  }

  if (vDomPatch.length > 0) {
    patches[index] = vDomPatch;
  }

}

function childWalk(oldChildren, newChildren) {
  if (!oldChildren) {
    return false;
  }

  oldChildren.forEach((el, index) => {
    // 逐级对比
    vNodeWalk(el, newChildren[index], ++vnIndex);
  });
}

function attrsWalk(oldProps, newProps) {
  let attrPatch = {};
  // 看是否新增了？
  // 看是否变化了？
  // 看是否删除了？

  for (const key in newProps) {
    if (oldProps[key] !== newProps[key]) {
      attrPatch[key] = newProps[key];
    }
  }

  for (const key in newProps) {
    if (!oldProps.hasOwnProperty(key)) {
      attrPatch[key] = newProps[key];
    }
  }

  return attrPatch;
}

export { domDiff };
