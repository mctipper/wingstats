import { defineConfig } from "vite";
import { configDefaults } from 'vitest/config';

export default defineConfig({
    base: '/wingstats/',
    server: {
        host: true,
        port: 5173,
        strictPort: true
    },
    test: {
        globals: true,
        environment: 'node', // or 'jsdom' if you're testing DOM components
        exclude: [...configDefaults.exclude, 'dist'],
    },
});