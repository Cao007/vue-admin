// 定义请求参数类型
export interface LoginData {
  username: string;
  password: string;
}

// 定义响应数据类型
interface Response<T = {}> {
  code: number;
  message: string;
  data: T;
}

// 定义登录的响应数据中data的类型
interface LoginResultData {
  token: string;
}

// 定义用户信息的响应数据中data的类型
export interface UserInfoResultData {
  id: number;
  avatar: string;
  buttons: string[];
  desc: string;
  password: string;
  roles: string[];
  routes: string[];
  token: string;
  userId: number;
  username: string;
}

export type LoginResponse = Response<LoginResultData>;
export type UserInfoResponse = Response<UserInfoResultData>;
