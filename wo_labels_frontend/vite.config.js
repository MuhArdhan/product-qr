import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../product_qr/public/wo_labels',
    emptyOutDir: true,
    lib: { entry: { 'wo-labels': 'src/index.js', 'layout-browser': 'src/layout-browser.js' }, formats: ['es'], fileName: (_format, name) => `${name}.js` },
    rollupOptions: { external: ['vue', 'lucide-vue-next'] }
  }
})
