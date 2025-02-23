import { AxiosRequestConfig } from "axios";

// 扩展 AxiosRequestConfig 类型，添加 isMock 属性
declare module "axios" {
  export interface AxiosRequestConfig {
    isMock?: boolean;
  }
}
