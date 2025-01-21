<template>
  <div class="user-list-container">
    {{ name }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const name = ref('用户列表')

</script>

<style lang="scss" scoped>
.user-list-container {
  color: pink;
}
</style>