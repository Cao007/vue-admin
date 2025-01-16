import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // server: {
  //   port: 8080,
  //   proxy: {
  //     '/admin': {
  //       target: 'http://localhost:3000', // 后端接口地址
  //       changeOrigin: true, // 是否修改请求源
  //       rewrite: (path) => path.replace(/^\/admin/, ''), // 去掉路径中的 /admin
  //     }
  //   }
  // }
})
