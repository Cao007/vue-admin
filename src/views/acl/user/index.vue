<template>
  <div class="user-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("用户管理");
</script>

<style lang="scss" scoped>
.user-container {
  color: pink;
}
</style>
