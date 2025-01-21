<template>
  <div class="user-add-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const name = ref('添加用户')

</script>

<style lang="scss" scoped>
.user-add-container {
  color: pink;
}
</style>