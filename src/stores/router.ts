import { defineStore } from "pinia";
import { ref } from "vue";

export const useRouterStore = defineStore("router", () => {

  const isGetRouter = ref(false);

  function changeIsGetRouter(value: boolean) {
    isGetRouter.value = value;
  }

  return {
    isGetRouter,
    changeIsGetRouter
  }
})