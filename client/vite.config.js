import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/user': {
        target: 'http://localhost:7000',
        changeOrigin: true,
      },
      '/stations': {
        target: 'http://localhost:7000',
        changeOrigin: true,
      },
      '/maps/api': {
        target: 'https://api.distancematrix.ai',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/maps\/api/, '/maps/api'),
      },
      '/bookings': {
        target: 'http://localhost:7000',
        changeOrigin: true,
      },
      '/notifications': {
        target: 'http://localhost:7000',
        changeOrigin: true,
      }
    },
  },
});
