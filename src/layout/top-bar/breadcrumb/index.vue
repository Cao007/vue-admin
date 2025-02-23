<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="item in route.matched"
        :key="item.path"
        v-show="item.meta.title"
        :to="item.path"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  .el-breadcrumb {
    // 样式穿透
    :deep(.el-breadcrumb__inner) {
      display: flex;
      align-items: center;

      .el-icon {
        font-size: 16px;
        margin-right: 3px;
      }
    }
  }
}
</style>
