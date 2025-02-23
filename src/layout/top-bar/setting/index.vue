<template>
  <div class="setting-container">
    <!-- 刷新、全屏、设置 -->
    <el-button icon="Refresh" circle @click="toggleRefresh" />
    <el-button icon="FullScreen" circle @click="handleFullScreen" />
    <el-button icon="Setting" circle />

    <!-- 头像下拉菜单 -->
    <el-dropdown>
      <el-avatar :size="32" :src="userInfo.avatar">
        <span>user</span>
      </el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userInfo.username }}</el-dropdown-item>
          <el-dropdown-item>Github</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from "@/stores/modules/layout";
import { useUserStore } from "@/stores/modules/user";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

// 获取路由器
const router = useRouter();
const route = useRoute();

// 刷新
const layoutStore = useLayoutStore();
const { toggleRefresh } = layoutStore;

// 全屏
const handleFullScreen = () => {
  const full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

// 用户仓库
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { logout } = userStore;

// 退出登录
const handleLogout = async () => {
  try {
    await logout();
    // 携带重定向地址，跳转到登录页
    router.push({ path: "/login", query: { redirect: route.path } });
  } catch (err: any) {
    console.log(err);
  }
};
</script>

<style lang="scss" scoped>
.setting-container {
  .el-avatar {
    margin-left: 12px;
    cursor: pointer;
    color: var(--el-color-primary);
  }
}
</style>
