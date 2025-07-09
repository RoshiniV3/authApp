import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { NodeEnvironment } from './src/models/environments'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const isProduction = mode === NodeEnvironment.PRODUCTION
  const isDevelopment = mode === NodeEnvironment.DEVELOPMENT

  return {
    plugins: [vue()],

    // Path resolution
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
        '@components': resolve(process.cwd(), 'src/components'),
        '@pages': resolve(process.cwd(), 'src/pages'),
        '@services': resolve(process.cwd(), 'src/services'),
        '@store': resolve(process.cwd(), 'src/store'),
        '@utils': resolve(process.cwd(), 'src/utils'),
        '@types': resolve(process.cwd(), 'src/types'),
        '@config': resolve(process.cwd(), 'src/config'),
      },
    },

    // Development server configuration
    server: {
      port: 3173,
      host: true,
      open: isDevelopment,
      cors: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // Build configuration
    build: {
      target: 'esnext',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: !isProduction,
      minify: isProduction ? 'esbuild' : false,

      // Chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            axios: ['axios'],
          },
        },
      },

      // Build optimizations
      chunkSizeWarningLimit: 1000,
      reportCompressedSize: isProduction,
    },

    // Environment variables
    envPrefix: 'VITE_',

    // CSS configuration
    css: {
      devSourcemap: isDevelopment,
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },

    // Optimization
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'axios'],
    },

    //(for production builds)
    preview: {
      port: 4173,
      host: true,
    },
  }
})
