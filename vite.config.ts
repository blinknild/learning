import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/learning/', // 与 GitHub Pages 仓库路径一致；本地也要带该前缀访问
  server: {
    // 默认只监听 localhost，用本机局域网 IP 访问时需放开
    host: true,
  },
})
