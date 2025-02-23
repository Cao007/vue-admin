<template>
  <div class="sku-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("sku管理");
</script>

<style lang="scss" scoped>
.sku-container {
  color: pink;
}
</style>
