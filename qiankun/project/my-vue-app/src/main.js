/* import { createApp } from 'vue';
import router from './router';

import './style.css';
import App from './App.vue';

if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

render({
  container: '#app'
});

// 渲染方法
function render({ container }) {
  createApp(App).use(router).mount(container);
}

// 微应用初始化的时候调用一次
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

// 微应用每次进入都会调用 mount 方法
export async function mount(props) {
  render(props);
  console.log('[vue] props from main framework', props);
}

// 微应用卸载的时候都会调用 unmount 方法
export async function unmount() {
  console.log('[vue] vue app unmounted');
}
 */

// ===============

import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let app;

const render = (container) => {
  app = createApp(App);
  app.use(router).mount(container ? container.querySelector('#app') : '#app');
};

const initQianKun = () => {
  renderWithQiankun({
    mount(props) {
      const { container } = props;
      render(container);
    },
    bootstrap() {},
    unmount() {
      app.unmount();
    }
  });
};

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render();
