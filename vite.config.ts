import { defineConfig } from "vite";
import { configDefaults } from 'vitest/config';
import { version } from './package.json'
import path from 'path';

export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(version),
    },
    base: '/wingstats/',
    server: {
        host: true,
        port: 5173,
        strictPort: true,
        fs: {
            allow: ["."]
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
            exclude: [
                '**/debug/**', // happy debug dashboard
                '**/index.ts', // all barrels
                '**/dist/**',
                'vite.config.ts'
            ]
        }
    },
    resolve: {
        alias: {
            '@computed': path.resolve(__dirname, 'src/computed'),
            '@customTypes': path.resolve(__dirname, 'src/types'),
            '@data': path.resolve(__dirname, 'src/data'),
            '@definitions': path.resolve(__dirname, 'src/definitions'),
            '@logic': path.resolve(__dirname, 'src/logic'),
            '@render': path.resolve(__dirname, 'src/render'),
        },
    }
});