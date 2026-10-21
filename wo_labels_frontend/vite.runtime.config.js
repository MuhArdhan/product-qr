import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHash } from 'node:crypto'

export default defineConfig({
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  plugins: [vue(), {
    name: 'label-runtime-version',
    generateBundle(_options, bundle) {
      const hash = createHash('sha256')
      for (const name of Object.keys(bundle).sort()) {
        const asset = bundle[name]
        hash.update(asset.type === 'chunk' ? asset.code : asset.source)
      }
      this.emitFile({ type: 'asset', fileName: 'runtime-version.json',
        source: JSON.stringify({ version: hash.digest('hex').slice(0, 16) }) })
    }
  }],
  build: {
    outDir: '../product_qr/public/wo_labels',
    emptyOutDir: false,
    lib: { entry: 'src/runtime.js', formats: ['es'], fileName: () => 'runtime.js', cssFileName: 'runtime' }
  }
})
