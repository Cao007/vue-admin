<template>
  <div class="permission-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("菜单管理");
</script>

<style lang="scss" scoped>
.permission-container {
  color: pink;
}
</style>
