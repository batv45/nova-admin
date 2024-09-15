import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './build/plugins'
import { createViteProxy } from './build/proxy'
import { serviceConfig } from './service.config'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env files according to the `Mode` in the current working directory
  const env = loadEnv(mode, __dirname, '') as ImportMetaEnv
  const envConfig = serviceConfig[mode as ServiceEnvType]

  return {
    base: env.VITE_BASE_URL,
    plugins: createVitePlugins(env),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
      proxy:
        env.VITE_HTTP_PROXY === 'Y' ? createViteProxy(envConfig) : undefined,
    },
    build: {
      target: 'esnext',
      reportCompressedSize: false, // Enable/Disable GZIP compression size report
    },
    optimizeDeps: {
      include: ['echarts', 'md-editor-v3', 'quill'],
    },
  }
})
