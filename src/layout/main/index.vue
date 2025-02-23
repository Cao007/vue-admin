<template>
  <div class="main-container">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutStore } from "@/stores/modules/layout";
import { storeToRefs } from "pinia";
import { nextTick, ref, watch } from "vue";

// 1.在setting的refresh按钮中，修改layoutStore中的refresh值
// 2.在二级路由main中监听refresh变化，然后创建/销毁组件
const layoutStore = useLayoutStore();
const { refresh } = storeToRefs(layoutStore);
const flag = ref(true);

watch(refresh, () => {
  // 销毁动态组件
  flag.value = false;

  // 等待销毁完成，DOM更新完成
  nextTick(() => {
    flag.value = true; // 创建动态组件
  });
});
</script>

<style lang="scss" scoped>
.main-container {
  .fade-enter-from {
    opacity: 0;
  }
  .fade-enter-active {
    transition: all 0.3s;
  }
  .fade-enter-to {
    opacity: 1;
  }
}
</style>
