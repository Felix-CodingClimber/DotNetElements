import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'editor.js',
            name: 'ScribanEditor',
            fileName: 'dotNetElementsScribanEditor',
            formats: ['es']
        },
        outDir: 'wwwroot',
        rollupOptions: {
            output: {
                entryFileNames: 'dotNetElementsScribanEditor.js',
                assetFileNames: 'dotNetElementsScribanEditor.[ext]'
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
