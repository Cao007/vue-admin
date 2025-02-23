import axios from "axios";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import { startProgress, finishProgress } from "./progress";
import { useUserStore } from "@/stores/modules/user";

/**
 * 创建axios实例
 */
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    startProgress(); // 开始请求时启动进度条

    // 创建用户信息存储
    const userStore = useUserStore();
    const { token } = userStore;

    // 如果存在token，则添加到请求头中
    if (token) {
      // config.headers.Authorization = `Bearer ${userStore.token}`;
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    finishProgress(); // 请求错误时结束进度条
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  // 第一个回调函数中，只会在HTTP状态码是2xx时执行
  (response) => {
    finishProgress(); // 响应成功时结束进度条

    const { code, message } = response.data;

    // 处理业务上的失败（比如后端返回的code不是200，而是201等）
    if (code !== 200) {
      ElMessage.error(message || "业务上的请求失败,响应非200");
      return Promise.reject(new Error(message));
    }

    ElMessage.success(message || "请求成功");
    return response.data;
  },
  // 第二个回调函数中，会在HTTP状态码不是2xx时执行
  (error) => {
    finishProgress(); // 响应错误时结束进度条
    console.log("非2xx", error);

    const status = error.response?.status || 0;
    let message = "";
    const userStore = useUserStore();

    switch (status) {
      case 401:
        message = "未授权，请重新登录";
        userStore.logout();
        window.location.href = "/login";
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break;
      case 500:
        message = "服务器内部错误";
        break;
      default:
        message = error.message || "请求失败";
    }
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

/**
 * 封装请求方法
 */
const request = {
  get<T>(url: string, params?: any, config = {}) {
    return service.get<any, T>(url, {
      params,
      ...config,
    });
  },

  post<T>(url: string, data?: any, config = {}) {
    return service.post<any, T>(url, data, {
      ...config,
    });
  },

  del<T>(url: string, data?: any, config = {}) {
    return service.delete<any, T>(url, {
      data,
      ...config,
    });
  },

  put<T>(url: string, data?: any, config = {}) {
    return service.put<any, T>(url, data, {
      ...config,
    });
  },

  patch<T>(url: string, data?: any, config = {}) {
    return service.patch<any, T>(url, data, {
      ...config,
    });
  },

  // 文件上传
  upload<T>(url: string, files: File | File[], config = {}) {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
    } else {
      formData.append("file", files);
    }

    return service.post<any, T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const total = progressEvent.total ?? 0;
        const progress =
          total > 0 ? Math.round((progressEvent.loaded * 100) / total) : 0;
        NProgress.set(progress / 100);
      },
      ...config,
    });
  },

  // 文件下载
  download<T>(url: string, data?: any, config = {}) {
    return service.get<any, T>(url, {
      params: data,
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const total = progressEvent.total ?? 0; // 同样处理 download 的 total
        const progress =
          total > 0 ? Math.round((progressEvent.loaded * 100) / total) : 0;
        NProgress.set(progress / 100); // 更新进度条
      },
      ...config,
    });
  },
};

export default request;
