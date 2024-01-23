import { request } from '@/utils';
import { TLoginParams, TLoginResponse, TGetUserInfoResponse } from './type';

function login(data: TLoginParams) {
  return request<any, TLoginResponse>({
    url: '/user/login',
    method: 'post',
    data,
  });
}

function getUserInfo() {
  return request<any, TGetUserInfoResponse>({
    url: '/user/info',
    method: 'post',
  });
}

export { login, getUserInfo };
