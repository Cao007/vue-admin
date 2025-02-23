import request from "@/utils/request";
import type { LoginData, LoginResponse, UserInfoResponse } from "./type";

//项目用户相关的请求地址
enum API {
  // LOGIN_URL = "/admin/acl/index/login",
  LOGIN_URL = "/mock/user/login",
  // USERINFO_URL = "/admin/acl/index/info",
  USERINFO_URL = "/mock/user/info",
  // LOGOUT_URL = "/admin/acl/index/logout",
  LOGOUT_URL = "/mock/user/logout",
}

// 1.登录接口
export const loginApi = (data: LoginData) =>
  request.post<LoginResponse>(API.LOGIN_URL, data);

// 2.获取用户信息接口
export const userInfoApi = () =>
  request.get<UserInfoResponse>(API.USERINFO_URL);

// 3.退出登录接口
export const logoutApi = () => request.post<any>(API.LOGOUT_URL);
