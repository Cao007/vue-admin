/**
 * axios 请求封装
 */
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import EnvConfig from '@/config';
import { ElMessage } from 'element-plus';
import router from '@/router';
import storage from './storage';

// 错误状态码枚举类型
const enum ErrorCode {
  SUCCESS = 200,
  PARAM_ERROR = 10001, // 参数错误
  USER_ACCOUNT_ERROR = 20001, //账号或密码错误
  USER_LOGIN_ERROR = 30001, // 用户未登录
  BUSINESS_ERROR = 40001, //业务请求失败
  AUTH_ERROR = 500001, // 认证失败或TOKEN过期
}

// 接口定义
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  mock?: boolean; // 在AxiosRequestConfig基础上新增mock字段
}

interface RequestMethod {
  (url: string, data?: any, options?: CustomAxiosRequestConfig): Promise<any>;
}

interface RequestInstance {
  (options: CustomAxiosRequestConfig): Promise<any>;
  [key: string]: RequestMethod; // 索引签名，允许动态方法，如get、post等
}


// 创建axios实例，请求的全局配置
const service = axios.create({
  baseURL: EnvConfig.baseApi,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use((req) => {
  const headers = req.headers;
  const { token = "" } = storage.getItem('userInfo') || {};
  if (!headers.Authorization) headers.Authorization = 'Bearer ' + token;
  return req;
});

// 响应拦截器
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code === 200) {
    return data;
  } else if (code === ErrorCode.BUSINESS_ERROR) { // 未登录
    ElMessage.error("Token认证失败 请重新登录");
    setTimeout(() => {
      router.push({ path: '/login' });
    }, 1500)
    return Promise.reject("Token认证失败 请重新登录");
  } else { // 其他错误
    ElMessage.error(msg || "网络请求异常，请稍后重试");
    return Promise.reject(msg || "网络请求异常，请稍后重试");
  }
})


/**
 * 封装请求方法
 * 
 * 请求方式1:
 * request({
 *   url: '/login',
 *   method: 'post',
 *   data: params,
 *   mock: true
 * })
 * 
 * 请求方式2:
 * request.post('/login', ruleForm, { mock: true }).then()
 */
const request = ((options: CustomAxiosRequestConfig) => {
  options.method = options.method || 'get';
  if (options.method.toLowerCase() === 'get') { // 将get、post等方法形参名统一为params
    options.params = options.data || {};
  }

  let isMock = EnvConfig.mock;
  if (typeof options.mock !== 'undefined') { // 开启局部mock
    isMock = options.mock;
  }

  if (EnvConfig.env === 'prod') {
    service.defaults.baseURL = EnvConfig.baseApi;
  } else {
    service.defaults.baseURL = isMock ? EnvConfig.mockApi : EnvConfig.baseApi;
  }

  return service(options)
}) as RequestInstance;

// 将方法挂载到request实例上，能使用request.get、request.post等方式请求api
['get', 'post', 'put', 'delete', 'patch'].forEach((method) => {
  request[method] = (url: string, data: any, options?: CustomAxiosRequestConfig) => {
    return request({
      url,
      data,
      method,
      ...options
    })
  }
})

export default request