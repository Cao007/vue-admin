<template>
  <div class="top-bar-container">
    <div class="left-container">
      <!-- 展开/收起 -->
      <el-icon class="expend-or-fold" @click="layoutStore.toggleFold">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>

      <!-- 面包屑 -->
      <Breadcrumb></Breadcrumb>
    </div>

    <div class="right-container">
      <!-- 设置按钮 -->
      <Setting></Setting>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
import { useLayoutStore } from "@/stores/modules/layout";
import { storeToRefs } from "pinia";

const layoutStore = useLayoutStore();
const { isFold } = storeToRefs(layoutStore);
</script>

<style lang="scss" scoped>
.top-bar-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-container {
    display: flex;
    align-items: center;

    .expend-or-fold {
      margin-right: 10px;
    }
  }

  .right-container {
    display: flex;
    align-items: center;
  }
}
</style>
