import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/learning/'   // 这里的名字与你的仓库名完全一致，前后都有斜杠
})
