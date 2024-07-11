import { registerMicroApps, start } from 'qiankun';

document.getElementById('button').addEventListener('click', () => {
  window.history.pushState(null, null, '/my-vue-app');
});

registerMicroApps([
  /* {
    name: 'my-react-app',
    entry: '//localhost:8080',
    container: '#yourContainer',
    activeRule: '/my-react-app'
  } */
  {
    name: 'my-vue-app',
    entry: '//localhost:7001',
    container: '#vue-app-container',
    activeRule: '/my-vue-app'
  }
]);

start();
