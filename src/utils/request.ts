/**
 * axios 请求封装
 */
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import EnvConfig from '@/config';
import { ElMessage } from 'element-plus';
import router from '@/router';

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
  const token = localStorage.getItem('token');
  req.headers.Authorization = `Bearer ${token}`;
  return req;
}, (err) => {
  return Promise.reject(err)
});

// 响应拦截器
service.interceptors.response.use((res) => {
  const { authorization } = res.headers;
  authorization && localStorage.setItem('token', authorization);
  return res;
}, (err) => {
  if (err.response.status === 401) {
    localStorage.removeItem('token');
    ElMessage.error('登录过期，请重新登录');
    router.push('/login');
  }
  return Promise.reject(err)
})


/**
 * 封装请求方法
 * 
 * 请求方式1:
 * request({
 *   url: '/test',
 *   method: 'get',
 *   mock: false
 * }).then((res) => {
 *   console.log('测试接口', res)
 * }).catch((err) => {
 *   console.log('测试接口', err)
 * })
 * 
 * 请求方式2:
 * request.post('/login', ruleForm, { mock: true }).then().catch()
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