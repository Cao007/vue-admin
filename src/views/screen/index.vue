<template>
  <div class="screen-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("数据大屏");
</script>

<style lang="scss" scoped>
.screen-container {
  color: pink;
}
</style>
