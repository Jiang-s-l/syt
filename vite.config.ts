import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 提供
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // @为src 别名的配置，以后路径输入@代表从src开始
     "@": path.resolve(__dirname, 'src')
    }
   },
  //  配置代理跨域
  server:{
    proxy:{
       // 使用 proxy 实例
       '/api': {
        target: 'http://syt.atguigu.cn',
        changeOrigin: true,
      },
    }
  }
})
