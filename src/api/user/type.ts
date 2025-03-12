// 定义请求参数类型
export interface LoginData {
  login: string;
  password: string;
}

// 定义响应数据类型
export interface Response<T = {}> {
  code: number;
  message: string;
  data: T;
}

// 定义登录的响应数据中data的类型
export interface LoginResultData {
  token: string;
}

// 定义用户信息的响应数据中data的类型
// export interface UserInfoResultData {
//   id: number;
//   avatar: string;
//   buttons: string[];
//   desc: string;
//   password: string;
//   roles: string[];
//   routes: string[];
//   token: string;
//   userId: number;
//   username: string;
// }
export interface UserInfoResultData {
  id: number;
  email: string;
  username: string;
  password: string;
  nickname: string;
  gender: number;
  company: string;
  introduce: string;
  role: number;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export type LoginResponse = Response<LoginResultData>;
export type UserInfoResponse = Response<UserInfoResultData>;
