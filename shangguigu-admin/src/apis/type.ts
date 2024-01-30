// 登录接口传参
export interface ILoginParams {
  username: string;
  password: string;
}

export interface IResponseCommon {
  code: number;
  message: string;
  ok: boolean;
}

// 登录接口返参
export interface ILoginResponse extends IResponseCommon {
  data: string;
}

// 获取用户信息返参
export interface IUserInfoResponse extends IResponseCommon {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}

// 获取品牌列表类型
export interface IRecords {
  id: number;
  tmName: string;
  logoUrl: string;
}

export interface IGetHasTardemarkResponse extends IResponseCommon {
  data: {
    records: IRecords[];
    total: number;
  };
}
