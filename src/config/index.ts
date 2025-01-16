/**
 * 环境配置
 */

const env = import.meta.env.MODE || 'prod';

const EnvConfig: any = {
  dev: {
    baseApi: '/',
    mockApi: 'http://localhost:3000', // 本地express的接口
  },
  test: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/ed8d42ac89c9884e632d97948a1f6558/api',
  },
  prod: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/ed8d42ac89c9884e632d97948a1f6558/api',
  }
}

export default {
  env,
  mock: true,
  ...EnvConfig[env],
  namespace: 'vue-admin', // 命名空间，例如用于storage的key
}