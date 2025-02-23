import { defineStore } from "pinia";
import { ref } from "vue";

export const useLayoutStore = defineStore(
  "Layout",
  () => {
    // 菜单栏是否折叠
    const isFold = ref(false);

    function toggleFold() {
      isFold.value = !isFold.value;
    }

    // 刷新按钮
    const refresh = ref(false);

    function toggleRefresh() {
      refresh.value = !refresh.value;
    }

    return { isFold, toggleFold, refresh, toggleRefresh };
  },
  {
    persist: {
      key: "Layout",
      storage: localStorage,
      pick: undefined, // undefined表示存储所有state，[]表示不存储任何state
    },
  }
);
