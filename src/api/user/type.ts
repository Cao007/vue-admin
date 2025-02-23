// 定义请求参数类型
export interface loginData {
  username: string;
  password: string;
}

// 定义响应数据中data的类型
export interface loginResult {
  token: string;
  [property: string]: any;
}

// 定义响应数据中data的类型
export interface userInfoResult {
  avatar: string;
  buttons: string[];
  desc: string;
  password: string;
  roles: string[];
  routes: string[];
  token: string;
  userId: number;
  username: string;
  [property: string]: any;
}
