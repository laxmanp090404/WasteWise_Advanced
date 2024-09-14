import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const REDIRECT_URL = env.VITE_REDIRECT_URL;
  const PORT = env.VITE_PORT;

  return {
    server: {
      port: PORT,
      proxy: {
        '/user': {
          target: REDIRECT_URL,
          changeOrigin: true,
        },
        '/stations': {
          target: REDIRECT_URL,
          changeOrigin: true,
        },
        '/maps/api': {
          target: 'https://api.distancematrix.ai',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/maps\/api/, '/maps/api'),
        },
        '/bookings': {
          target: REDIRECT_URL,
          changeOrigin: true,
        },
        '/notifications': {
          target: REDIRECT_URL,
          changeOrigin: true,
        },
        '/geocode': {
          target: 'https://geocode.search.hereapi.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/geocode/, ''),
        },
      },
    },
    build: {
      outDir: 'public',
    },
    plugins: [react()],
  };
});
