<template>
  <el-aside :style="{ width: siderWidth, transition: 'width 0.3s ease' }">
    <el-scrollbar>
      <el-menu active-text-color="#ffd04b" background-color="#545c64" default-active="/" text-color="#fff"
        @open="handleOpen" @close="handleClose" router :collapse="isSidebarOpen">

        <h1 :class="{ collapsed: isSidebarOpen }">
          {{ isSidebarOpen ? "vue" : "vue通用管理系统" }}
        </h1>

        <el-menu-item index="/" @click="handleHome">
          <el-icon>
            <House />
          </el-icon>
          <span>首页</span>
        </el-menu-item>

        <el-menu-item index="/dataView" @click="handleDataView">
          <el-icon>
            <DataLine />
          </el-icon>
          <span>数据大屏</span>
        </el-menu-item>

        <el-menu-item index="/formView" @click="handleFormView">
          <el-icon>
            <document />
          </el-icon>
          <span>表格</span>
        </el-menu-item>

        <el-sub-menu index="/permission">
          <template #title>
            <el-icon>
              <View />
            </el-icon>
            <span>权限管理</span>
          </template>

          <el-menu-item index="/permission/permissionRoleView" @click="handlePermissionRoleView">
            <el-icon>
              <Menu />
            </el-icon>
            <span>角色权限</span>
          </el-menu-item>

          <el-menu-item index="/permission/permissionBttonView" @click="handlePermissionBttonView">
            <el-icon>
              <Menu />
            </el-icon>
            <span>按钮权限</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLayoutStore } from '@/stores/layout.ts';
import { storeToRefs } from 'pinia';
import type { MenuItemRegistered } from 'element-plus';

const layoutStore = useLayoutStore();
const { isSidebarOpen, siderWidth, breadcrumbList } = storeToRefs(layoutStore);

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

const handleHome = (item: MenuItemRegistered) => {
  console.log('首页', item.index)
}

const handleDataView = (item: MenuItemRegistered) => {
  breadcrumbList.value.push({
    name: '数据大屏',
    path: item.index
  });

  // 去重
  breadcrumbList.value = breadcrumbList.value.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.name === item.name
    ))
  );
  console.log('数据大屏', breadcrumbList.value);

}

const handleFormView = (item: MenuItemRegistered) => {
  breadcrumbList.value.push({
    name: '表格',
    path: item.index
  })

  // 去重
  breadcrumbList.value = breadcrumbList.value.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.name === item.name
    ))
  );
  console.log('表格', breadcrumbList.value);
}

const handlePermissionRoleView = (item: MenuItemRegistered) => {
  breadcrumbList.value.push({
    name: '角色权限',
    path: item.index
  })

  // 去重
  breadcrumbList.value = breadcrumbList.value.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.name === item.name
    ))
  );
  console.log('角色权限', breadcrumbList.value);
}

const handlePermissionBttonView = (item: MenuItemRegistered) => {
  breadcrumbList.value.push({
    name: '按钮权限',
    path: item.index
  })

  // 去重
  breadcrumbList.value = breadcrumbList.value.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.name === item.name
    ))
  );

  // 点击的是同级菜单时，删除其余所有的同级菜单

  console.log('按钮权限', breadcrumbList.value);
}
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
    // opacity: 0.8; // 可选：轻微透明度变化
  }

  .el-menu {
    height: 100%;
    border: none;
  }
}
</style>