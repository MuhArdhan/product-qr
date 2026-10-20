import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../product_qr/public/wo_labels',
    emptyOutDir: true,
    lib: { entry: 'src/index.js', formats: ['es'], fileName: () => 'wo-labels.js' },
    rollupOptions: { external: ['vue', 'lucide-vue-next'] }
  }
})
