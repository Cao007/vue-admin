<template>
  <div class="pagination-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("分页器");
</script>

<style scoped>
.pagination-container {
  color: pink;
}
</style>
