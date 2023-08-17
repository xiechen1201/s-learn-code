let VueTest = (function () {
  function Vue(options) {
    const { el, template, data, methods } = options;

    this.$el = document.querySelector(el);
    this.$data = data();

    this.init(template, methods);
  }

  Vue.prototype.init = function (template, methods) {
    let showPool = new Map();
    let eventPool = new Map();

    let container = document.createElement("div");
    container.innerHTML = template;

    initData(this, showPool);
    initPool(container, methods, showPool, eventPool);
    bindEvent(this, eventPool);
    render(this, showPool, container);
  };

  function initData(vm, showPool) {
    let _data = vm.$data;

    for (const key in _data) {
      Object.defineProperty(vm, key, {
        get() {
          return _data[key];
        },
        set(newVal) {
          _data[key] = newVal;
          vm.$data[key] = newVal;

          update(vm, key, showPool);
        }
      });
    }
  }

  function initPool(container, methods, showPool, eventPool) {
    let _allNodes = container.getElementsByTagName("*");
    let dom = null;

    for (let i = 0; i < _allNodes.length; i++) {
      dom = _allNodes[i];

      let vIfData = dom.getAttribute("v-if");
      let vShowData = dom.getAttribute("v-show");
      let vEvent = dom.getAttribute("@click");

      if (vIfData) {
        showPool.set(dom, {
          type: "if",
          prop: vIfData
        });
      } else if (vShowData) {
        showPool.set(dom, {
          type: "show",
          prop: vShowData
        });
      } else if (vEvent) {
        eventPool.set(dom, methods[vEvent]);
        dom.removeAttribute("@click");
      }
    }
  }

  function bindEvent(vm, eventPool) {
    for (const [dom, handler] of eventPool) {
      vm[handler.name] = handler;

      dom.addEventListener("click", vm[handler.name].bind(vm), false);
    }
  }

  function render(vm, showPool, container) {
    let _data = vm.$data;
    let _el = vm.$el;

    for (const [dom, info] of showPool) {
      switch (info.type) {
        case "if":
          info.comment = document.createComment(["v-if"]);
          !_data[info.prop] && dom.parentNode.replaceChild(info.comment, dom);
          break;
        case "show":
          !_data[info.prop] && (dom.style.display = "none");
          break;
      }
    }

    _el.appendChild(container);
  }

  function update(vm, key, showPool) {
    let _data = vm.$data;

    for (const [dom, info] of showPool) {
      if (info.prop === key) {
        switch (info.type) {
          case "if":
            !_data[key]
              ? dom.parentNode.replaceChild(info.comment, dom)
              : info.comment.parentNode.replaceChild(dom, info.comment);
            break;
          case "show":
            !_data[key]
              ? (dom.style.display = "none")
              : dom.removeAttribute("style");
            break;
        }
      }
    }
  }

  return Vue;
})();

export default VueTest;
