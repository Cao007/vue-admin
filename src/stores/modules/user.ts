import { loginApi, userInfoApi, logoutApi } from "@/api/user";
import type { loginData, loginResult, userInfoResult } from "@/api/user/type";
import { defineStore } from "pinia";
import { ref } from "vue";
import { constantRoutes } from "@/router/routes";

export const useUserStore = defineStore(
  "User",
  () => {
    const token = ref(localStorage.getItem("token") ?? "");
    const userInfo = ref({} as userInfoResult);
    const routes = ref(constantRoutes);

    // 1.登录请求
    const login = async (data: loginData) => {
      const res: loginResult = await loginApi(data);
      token.value = res.data.token;
      localStorage.setItem("token", res.data.token);
      return res;
    };

    // 2.获取用户信息请求
    const getUserInfo = async () => {
      const res: userInfoResult = await userInfoApi();
      userInfo.value = res.data;
      return res;
    };

    // 3.退出登录请求
    const logout = async () => {
      const res = await logoutApi();
      token.value = "";
      userInfo.value = {} as userInfoResult;
      routes.value = constantRoutes; // 确保重置路由数据，否则可能存在动态路由缓存问题
      localStorage.clear();
      return res;
    };

    return {
      token,
      userInfo,
      routes,
      login,
      getUserInfo,
      logout,
    };
  },
  {
    persist: {
      key: "User",
      storage: localStorage,
      pick: undefined, // undefined表示存储所有state，[]表示不存储任何state
    },
  }
);
