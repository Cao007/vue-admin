<template>
  <div class="trademark-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("品牌管理");
</script>

<style lang="scss" scoped>
.trademark-container {
  color: pink;
}
</style>
