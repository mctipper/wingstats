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
        }
    },
    resolve: {
        alias: {
            '@data': path.resolve(__dirname, 'src/data'),
            '@logic': path.resolve(__dirname, 'src/logic'),
            '@customTypes': path.resolve(__dirname, 'src/types')
        },
    }
});