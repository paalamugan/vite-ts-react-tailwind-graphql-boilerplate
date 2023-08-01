import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';

import { dependencies } from './package.json';

function renderChunks(deps: Record<string, string>) {
  const chunks: Record<string, [string]> = {};
  Object.keys(deps).forEach(key => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env');
  return {
    build: {
      target: 'esnext',
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-router-dom', 'react-dom'],
            ...renderChunks(dependencies),
          },
        },
      },
      sourcemap: false,
    },
    plugins: [
      react(),
      EnvironmentPlugin('all'),
      tsconfigPaths(),
      createHtmlPlugin({
        inject: {
          data: {
            ...env,
            MODE: mode,
          },
        },
        minify: true,
      }),
    ],
    preview: {
      host: true,
      port: 8080,
      strictPort: true,
    },
    server: {
      host: true,
      port: 3000,
      strictPort: true,
      watch: {
        usePolling: true,
      },
    },
    test: {
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
      environment: 'jsdom',
      globals: true,
      reporters: ['default', 'html'],
      setupFiles: ['./src/setupTests.ts'],
    },
  };
});
