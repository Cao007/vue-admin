<template>
  <div class="news-list-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const name = ref('新闻列表')

</script>

<style lang="scss" scoped>
.news-list-container {
  color: pink;
}
</style>