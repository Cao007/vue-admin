/**
 * 环境配置
 */

const env = import.meta.env.MODE || 'prod';

const EnvConfig: any = {
  dev: {
    baseApi: 'http://localhost:3000', // 本地express的接口作为服务器的接口
    mockApi: 'https://apifoxmock.com/m1/5763671-5447288-default', // apifox的mock接口
  },
  test: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/ed8d42ac89c9884e632d97948a1f6558/api',
  },
  prod: {
    baseApi: '/',
  }
}

export default {
  env,
  mock: true,
  ...EnvConfig[env],
  namespace: 'vue-admin', // 命名空间，例如用于storage的key
}