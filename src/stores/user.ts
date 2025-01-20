import storage from "@/utils/storage";
import { defineStore } from "pinia";
import { computed, ref, reactive } from "vue";

export const useUserStore = defineStore("user", () => {

    let userInfo = storage.getItem("userInfo") || {} // 获取用户信息

    function saveUserInfo(data: any) {
        userInfo = storage.setItem("userInfo", data)
    }

    return {
        userInfo,
        saveUserInfo
    }
})