import axios from 'axios';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  const userStore = useUserStore();

  // 携带认证 token
  config.headers.token = userStore.token;
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message = '';
    const status = error.response.status;

    switch (status) {
      case 401:
        message = 'Token 过期！';
        break;
      case 403:
        message = '无权限！';
        break;
      case 404:
        message = '请求地址错误！';
        break;
      case 500:
        message = '服务器异常！';
        break;
      default:
        message = '请求异常！';
        break;
    }

    ElMessage({
      type: 'error',
      message,
    });

    return Promise.reject(error);
  },
);

export default request;
