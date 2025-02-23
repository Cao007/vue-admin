import SvgIcon from "./SvgIcon/index.vue";
import Pagination from "./Pagination/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const components: any = {
  SvgIcon,
  Pagination,
};

export default {
  install(app: any) {
    // 注册全局组件
    Object.keys(components).forEach((key) => {
      app.component(key, components[key]);
    });

    // 注册element-plus图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
