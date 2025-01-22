import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {

    const userInfo = ref({})

    // 修改用户信息
    function changeUserInfo(value: any) {
        userInfo.value = {
            ...userInfo.value,
            ...value
        }
    }

    return {
        userInfo,
        changeUserInfo
    }
}, {
    persist: {
        pick: ['userInfo'],
    }
})