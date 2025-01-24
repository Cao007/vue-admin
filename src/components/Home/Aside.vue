<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">

    <el-scrollbar>
      <el-menu active-text-color="#ffd04b" background-color="#545c64" :default-active="activeMenu" text-color="#fff"
        router :collapse="isCollapse" :collapse-transition="false">

        <h1 :class="{ collapsed: isCollapse }">
          {{ isCollapse ? "vue" : "vue通用管理系统" }}
        </h1>

        <!-- 
          递归菜单
        -->
        <!-- <tree-menu :userMenu="userMenu" /> -->
        <el-menu-item index="/welcome">
          <el-icon>
            <DataBoard />
          </el-icon>
          <span>首页</span>
        </el-menu-item>

        <el-menu-item index="/center">
          <el-icon>
            <User />
          </el-icon>
          <span>个人中心</span>
        </el-menu-item>

        <el-sub-menu index="/user">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/User/UserAdd">添加用户</el-menu-item>
          <el-menu-item index="/User/UserList">用户列表</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/News">
          <template #title>
            <el-icon>
              <Microphone />
            </el-icon>
            <span>新闻管理</span>
          </template>
          <el-menu-item index="/News/NewsAdd">添加新闻</el-menu-item>
          <el-menu-item index="/News/NewsList">新闻列表</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/Product">
          <template #title>
            <el-icon>
              <Goods />
            </el-icon>
            <span>产品管理</span>
          </template>
          <el-menu-item index="/Product/ProductAdd">添加产品</el-menu-item>
          <el-menu-item index="/Product/ProductList">产品列表</el-menu-item>
        </el-sub-menu>

      </el-menu>
    </el-scrollbar>
  </el-aside>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLayoutStore } from '@/stores/layout.ts';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'

const layoutStore = useLayoutStore();
const { isCollapse } = storeToRefs(layoutStore);

const route = useRouter();
const activeMenu = route.currentRoute.value.fullPath;
</script>

<style scoped lang="scss">
.el-aside {
  height: 100vh;
  background-color: #545c64;
  transition: width .3s ease; // 添加宽度的过渡

  h1 {
    text-align: center;
    color: #fff;
    height: 60px;
    line-height: 60px;

    overflow: hidden; // 防止内容超出边界
    white-space: nowrap; // 防止换行
    width: 200px; // 默认宽度
    transition: width .3s ease, opacity .3s ease; // 添加宽度和透明度的过渡
  }

  h1.collapsed {
    width: 64px; // 收缩时的宽度
    opacity: 0.8; // 透明度变化
  }

  .el-menu {
    height: 100%;
    border: none;
  }
}
</style>