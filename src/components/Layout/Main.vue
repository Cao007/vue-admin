<template>
  <el-main>
    <el-scrollbar>
      <router-view></router-view>
    </el-scrollbar>

  </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

</script>

<style scoped lang="scss">
.el-main {
  height: calc(100vh - 60px);
  // background-color: lightgreen;
}
</style>