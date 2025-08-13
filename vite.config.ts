import { defineConfig } from "vite";
import { configDefaults } from 'vitest/config';
import path from 'path';

export default defineConfig({
    base: '/wingstats/',
    server: {
        host: true,
        port: 5173,
        strictPort: true,
        fs: {
            allow: ["src"]
        }
    },
    test: {
        globals: true,
        environment: 'node',
        exclude: [...configDefaults.exclude, 'dist'],
        typecheck: {
            include: ['src/**/*.test.ts'],
            ignoreSourceErrors: false
        },
        coverage: {
            provider: 'v8',
            exclude: ['**/debug/**', 'vite.config.ts']
        }
    },
    resolve: {
        alias: {
            '@computed': path.resolve(__dirname, 'src/computed'),
            '@customTypes': path.resolve(__dirname, 'src/types'),
            '@data': path.resolve(__dirname, 'src/data'),
            '@definitions': path.resolve(__dirname, 'src/definitions'),
            '@logic': path.resolve(__dirname, 'src/logic'),
        },
    }
});