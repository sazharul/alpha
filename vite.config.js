import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
    base: '/', // Base path for development and production
    root: path.resolve(__dirname, 'src'), // Set the root to 'src'
    publicDir: path.resolve(__dirname, 'public'), // Set the public directory for static files
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'), // Alias for bootstrap
        },
    },
    server: {
        port: 8080, // Development server port
        hot: true,  // Enable HMR (Hot Module Replacement)
        open: true, // Automatically open in the browser
    },
    build: {
        outDir: path.resolve(__dirname, 'dist'), // Output directory for the production build
        emptyOutDir: true, // Clean the output directory before building
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'src', 'index.html'), // Specify the main entry point
                dashboard: path.resolve(__dirname, 'src', 'dashboard.html'), // Specify the main entry point
                bank_deposit: path.resolve(__dirname, 'src', 'bank-deposit.html'), // Specify the main entry point
                p2c: path.resolve(__dirname, 'src', 'p2c.html'), // Specify the main entry point
                bank_withdraw: path.resolve(__dirname, 'src', 'bank-withdraw.html'), // Specify the main entry point
            },
        },
    },
});
