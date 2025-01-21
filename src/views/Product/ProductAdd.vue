<template>
  <div class="product-add-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const name = ref('添加产品')

</script>

<style lang="scss" scoped>
.product-add-container {
  color: pink;
}
</style>