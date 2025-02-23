<template>
  <div class="not-found-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("404");
</script>

<style lang="scss" scoped>
.not-found-container {
  color: pink;
}
</style>
