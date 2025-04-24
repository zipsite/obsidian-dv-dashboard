import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist', // Папка для выходных файлов
    rollupOptions: {
      output: {
        entryFileNames: "topic.js"
      },
      input: './src/main.ts', // Указываем точку входа — твой TypeScript файл
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})