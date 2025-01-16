import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";

export const useLayoutStore = defineStore("layout", () => {

  // 侧边栏是否展开
  const isSidebarOpen = ref(false);
  const siderWidth = ref('200px');

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
    siderWidth.value = isSidebarOpen.value ? '64px' : '200px';
  }

  // 面包屑
  const breadcrumbList = reactive([
    {
      name: '首页',
      path: '/'
    }
  ])

  return {
    isSidebarOpen,
    toggleSidebar,
    siderWidth,
    breadcrumbList
  }
})