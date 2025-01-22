import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";

export const useLayoutStore = defineStore("layout", () => {

  // 侧边栏是否展开
  const isCollapse = ref(false);

  function toggleSidebar() {
    isCollapse.value = !isCollapse.value;
  }

  // 面包屑
  const breadcrumbList = reactive([
    {
      name: '首页',
      path: '/'
    }
  ])

  return {
    isCollapse,
    toggleSidebar,
    breadcrumbList
  }
}, {
  persist: {
    pick: ['isCollapse']
  }
})