import { defineConfig } from 'vite';
import ostro from '@ostro/vite';

export default defineConfig({
    plugins: [
        ostro({
            buildDirectory: 'build',
            input: [
                'resources/assets/css/app.css',
                'resources/assets/js/app.ts',
            ],
            refresh: true,
        }),
    ],
});
