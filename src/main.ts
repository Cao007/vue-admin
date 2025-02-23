import { createApp } from "vue";
import App from "@/App.vue";
import "@/styles/index.scss"; // 全局样式
import ElementPlus from "element-plus"; // element-plus 组件库
import "element-plus/dist/index.css"; // element-plus 样式
import zhCn from "element-plus/es/locale/lang/zh-cn"; // element-plus 中文语言包
import "virtual:svg-icons-register"; // 注册svg图标
import globalComponents from "@/components/index.ts"; // 全局组件注册
import router from "./router";
import pinia from "./stores";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(globalComponents);
app.use(router);
app.use(pinia);
app.mount("#app");
