/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // para que funcione el import de @/*
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/**/*.spec.ts'], // ajusta si usas otro patrón
  }
});
