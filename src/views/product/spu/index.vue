<template>
  <div class="spu-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("spu管理");
</script>

<style lang="scss" scoped>
.spu-container {
  color: pink;
}
</style>
