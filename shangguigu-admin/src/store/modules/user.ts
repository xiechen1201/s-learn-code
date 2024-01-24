import { defineStore } from 'pinia';
import { TLoginParams } from '@/apis/type';
import { login } from '@/apis/user';
import { IUserState } from '../types/user';
import { getToken, setToken } from '@/utils';
import { constantRoute } from '@/router/routes';

const useUserStore = defineStore('User', {
  state: (): IUserState => {
    return {
      token: getToken(),
      menuRoutes: constantRoute,
    };
  },
  getters: {},
  actions: {
    async userLogin(data: TLoginParams) {
      const result = await login(data);

      if (result.code === 200) {
        this.token = result.data.token as string;
        setToken(result.data.token as string);

        return Promise.resolve('ok');
      } else {
        return Promise.reject(result.data.message);
      }
    },
  },
});

export default useUserStore;
