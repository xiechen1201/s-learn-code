export type TLoginParams = { username: string; password: string };

export type TLoginResponse = {
  code: number;
  data: {
    token: string;
  };
};

export type TGetUserInfoResponse = {
  code: number;
  data: {
    userId: number;
    avatar: string;
    username: string;
    password: string;
    desc: string;
    roles: string[];
    buttons: string[];
    routes: string[];
    token: string;
  };
};
