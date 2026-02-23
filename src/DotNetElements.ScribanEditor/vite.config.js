import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'editor.js',
            name: 'ScribanEditor',
            fileName: 'scriban-editor',
            formats: ['es']
        },
        outDir: 'wwwroot',
        rollupOptions: {
            output: {
                entryFileNames: 'scriban-editor.js',
                assetFileNames: 'scriban-editor.[ext]'
            }
        },
        minify: 'esbuild',
        sourcemap: true,
    },
    server: {
        port: 5173,
        strictPort: false,
    }
});
