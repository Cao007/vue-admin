<template>
  <el-aside :style="{ width: siderWidth, transition: 'width 0.3s ease' }">
    <el-scrollbar>
      <el-menu active-text-color="#ffd04b" background-color="#545c64" :default-active="activeMenu" text-color="#fff"
        router :collapse="isSidebarOpen">

        <h1 :class="{ collapsed: isSidebarOpen }">
          {{ isSidebarOpen ? "vue" : "vue通用管理系统" }}
        </h1>

        <!-- 
          递归菜单
        -->
        <tree-menu :userMenu="userMenu" />

      </el-menu>
    </el-scrollbar>
  </el-aside>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLayoutStore } from '@/stores/layout.ts';
import { storeToRefs } from 'pinia';
import { getMenuList } from '@/api/index.ts';

const layoutStore = useLayoutStore();
const { isSidebarOpen, siderWidth, breadcrumbList } = storeToRefs(layoutStore);

const userMenu = ref([])
getMenuList().then(res => {
  userMenu.value = res;
  console.log('userMenu', userMenu.value);
})

const activeMenu = location.hash.slice(1) || '/';
</script>

<style scoped lang="scss">
.el-aside {
  height: 100vh;
  background-color: #545c64;

  h1 {
    text-align: center;
    color: #fff;
    height: 60px;
    line-height: 60px;

    overflow: hidden; // 防止内容超出边界
    white-space: nowrap; // 防止换行
    width: 200px; // 默认宽度
    transition: width 0.3s ease; // 添加宽度和透明度的过渡
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