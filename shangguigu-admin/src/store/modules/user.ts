import { defineStore } from 'pinia';
import { ILoginParams } from '@/apis/type';
import { login, getUserInfo, logout } from '@/apis/user';
import { IUserState } from '../types/user';
import { getToken, setToken } from '@/utils';
import { constantRoute } from '@/router/routes';
import router from '@/router';

const useUserStore = defineStore('User', {
  state: (): IUserState => {
    return {
      menuRoutes: constantRoute,
      token: getToken(),
      userName: '',
      avatar: '',
    };
  },
  getters: {},
  actions: {
    async userLogin(data: ILoginParams) {
      const result = await login(data);

      if (result.code === 200) {
        this.token = result.data as string;
        setToken(result.data as string);

        return Promise.resolve('ok');
      } else {
        return Promise.reject(result.data);
      }
    },
    async userInof() {
      const result = await getUserInfo();

      if (result.code === 200) {
        const { name, avatar } = result.data;

        this.userName = name;
        this.avatar = avatar;
        return Promise.resolve('ok');
      } else {
        return Promise.reject('error');
      }
    },
    async loginOut() {
      const result = await logout();

      if (result.code === 200) {
        this.token = '';
        this.userName = '';
        this.avatar = '';
        setToken('');

        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.value.fullPath,
          },
        });
      }
    },
  },
});

export default useUserStore;
