import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes } from "./routes";
import { startProgress, finishProgress } from "@/utils/progress";
import pinia from "@/stores/index";
import { useUserStore } from "@/stores/modules/user";

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

// **全局前置守卫**
router.beforeEach(async (to, from, next) => {
  startProgress(); // 开始进度条
  document.title = `${import.meta.env.VITE_APP_TITLE} ${to.meta.title || ""}`; // 设置页面标题

  const userStore = useUserStore(pinia);
  const token = userStore.token;
  const whiteList = ["/login"]; // 免登录白名单

  if (token) {
    // 已登录，访问登录页时跳转首页
    if (to.path === "/login") {
      next("/");
    } else {
      // 判断是否已有用户信息，若无则拉取
      if (!userStore.userInfo?.id) {
        try {
          await userStore.getUserInfo();
          next();
        } catch (error) {
          // 获取用户信息失败（如 token 失效），清除数据并跳转登录页
          await userStore.logout();
          next("/login");
        }
      } else {
        next();
      }
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});

// **全局后置守卫**
router.afterEach(() => {
  finishProgress(); // 结束进度条
});

export default router;
