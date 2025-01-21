<template>
  <div class="news-add-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const name = ref('添加新闻')

</script>

<style lang="scss" scoped>
.news-add-container {
  color: pink;
}
</style>