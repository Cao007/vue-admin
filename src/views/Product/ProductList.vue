<template>
  <div class="product-list-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const name = ref('产品列表')

</script>

<style lang="scss" scoped>
.product-list-container {
  color: pink;
}
</style>