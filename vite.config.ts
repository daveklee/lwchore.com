import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/lwchore.com/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
