<template>
  <el-config-provider :locale="zhCn">
    <Layout />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ja from "element-plus/es/locale/lang/ja"; // 日本語
import Layout from './components/Layout/index.vue';

</script>

<style scoped lang="scss"></style>