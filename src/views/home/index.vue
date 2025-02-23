<template>
  <div class="home-container">
    {{ name }}
    <p v-for="i in 100" :key="i">{{ i }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("home页面");
</script>

<style lang="scss" scoped>
.home-container {
  color: pink;
}
</style>
