<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <Aside />

    <el-container class="main-container">
      <!-- 头部导航 -->
      <Header />

      <!-- 主体 -->
      <Main />
    </el-container>

  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './Header.vue'
import Aside from './Aside.vue'
import Main from './Main.vue'

</script>

<style scoped lang="scss">
.layout-container {
  .main-container {
    flex-direction: column;
  }

}
</style>