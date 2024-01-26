import { request } from '@/utils';
import {
  ILoginParams,
  ILoginResponse,
  IUserInfoResponse,
  IResponseCommon,
} from './type';

function login(data: ILoginParams) {
  return request<any, ILoginResponse>({
    url: '/admin/acl/index/login',
    method: 'post',
    data,
  });
}

function getUserInfo() {
  return request<any, IUserInfoResponse>({
    url: '/admin/acl/index/info',
    method: 'get',
  });
}

function logout() {
  return request<any, IResponseCommon>({
    url: '/admin/acl/index/logout',
    method: 'post',
  });
}

export { login, getUserInfo, logout };
