<template>
  <div class="center-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const name = ref('个人中心')

</script>

<style lang="scss" scoped>
.center-container {
  color: pink;
}
</style>