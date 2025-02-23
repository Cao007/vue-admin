<template>
  <div class="role-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("角色管理");
</script>

<style lang="scss" scoped>
.role-container {
  color: pink;
}
</style>
