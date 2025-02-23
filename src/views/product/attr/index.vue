<template>
  <div class="attr-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("属性管理");
</script>

<style lang="scss" scoped>
.attr-container {
  color: pink;
}
</style>
