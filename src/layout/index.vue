<template>
  <div class="layout-container">
    <!-- 侧边栏 -->
    <div class="aside" :class="{ 'aside-fold': isFold }">
      <!-- logo -->
      <div class="logo">
        <h1>{{ isFold ? "logo" : "vue-admin后台管理系统" }}</h1>
      </div>
      <!-- 左侧菜单栏 -->
      <div class="menu">
        <el-scrollbar>
          <el-menu
            :default-active="route.path"
            :collapse="isFold"
            :router="true"
          >
            <Menu :menuList="menuList"></Menu>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>

    <div class="right-container" :class="{ 'aside-fold': isFold }">
      <!-- 顶部导航栏 -->
      <div class="top-bar">
        <TopBar></TopBar>
      </div>
      <!-- 主体显示部分 -->
      <div class="main">
        <el-scrollbar>
          <Main></Main>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from "./menu/index.vue";
import Main from "./main/index.vue";
import TopBar from "./top-bar/index.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/modules/user";
import { useLayoutStore } from "@/stores/modules/layout";
import { useRoute } from "vue-router";

// 用户信息
const userStore = useUserStore();
const menuList = userStore.routes;

// 布局信息
const layoutStore = useLayoutStore();
const { isFold } = storeToRefs(layoutStore);

// 当前路由
const route = useRoute();
</script>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  display: flex;

  .aside {
    display: flex;
    flex-direction: column;
    width: $aside-width;
    height: 100vh;
    background-color: $aside-bg-color;
    color: #fff;
    transition: all 0.3s;

    &.aside-fold {
      width: $aside-fold-width;
    }

    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: $aside-height;

      h1 {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .menu {
      flex: 1;
      overflow: auto;

      .el-menu {
        // --el-menu-horizontal-height: 200px;
        --el-menu-bg-color: transparent;
        --el-menu-text-color: #fff;
        --el-menu-active-color: #409eff;
        --el-menu-hover-bg-color: #000;
        border: none;
      }
    }
  }

  .right-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: calc(100% - $aside-width);

    .top-bar {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: $top-bar-height;
      background-color: $top-bar-bg-color;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
    }

    .main {
      flex: 1;
      background-color: $main-bg-color;
      padding: 10px;
      overflow: auto;
    }
  }
}
</style>
