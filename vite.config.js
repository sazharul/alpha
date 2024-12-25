import path from 'path';
import {defineConfig} from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [svgr()], // Enable the svgr plugin
    base: '/', // Base path for development and production
    root: path.resolve(__dirname, 'src'), // Set the root to 'src'
    publicDir: path.resolve(__dirname, 'public'), // Set the public directory for static files
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'), // Alias for bootstrap
            '@': path.resolve(__dirname, 'src'), // Alias for src
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
                p2p: path.resolve(__dirname, 'src', 'p2p.html'), // Specify the main entry point
                bank_withdraw: path.resolve(__dirname, 'src', 'bank-withdraw.html'), // Specify the main entry point
                withdraw_p2p: path.resolve(__dirname, 'src/withdraw', 'p2p.html'), // Specify the main entry point
                sms_management: path.resolve(__dirname, 'src', 'sms-management.html'), // Specify the main entry point
                prepayment: path.resolve(__dirname, 'src', 'prepayment.html'), // Specify the main entry point
                merchant_management: path.resolve(__dirname, 'src', 'merchant-management.html'), // Specify the main entry point
                merchant_settings: path.resolve(__dirname, 'src', 'merchant-settings.html'), // Specify the main entry point
                bank_deposit_p2c: path.resolve(__dirname, 'src', 'bank-deposit-p2c.html'), // Specify the main entry point
                bank_deposit_p2c_form: path.resolve(__dirname, 'src', 'bank-deposit-p2c-form.html'), // Specify the main entry point
                bank_deposit_p2p_form: path.resolve(__dirname, 'src', 'bank-deposit-p2p.html'), // Specify the main entry point
                settlement_management: path.resolve(__dirname, 'src', 'settlement-management.html'), // Specify the main entry point
                signin: path.resolve(__dirname, 'src', 'signin.html'), // Specify the main entry point
                signup: path.resolve(__dirname, 'src', 'signup.html'), // Specify the main entry point
                forgot_password: path.resolve(__dirname, 'src', 'forgot-password.html'), // Specify the main entry point
                otp: path.resolve(__dirname, 'src', 'otp.html'), // Specify the main entry point
                forget_otp: path.resolve(__dirname, 'src', 'forget-otp.html'), // Specify the main entry point
                logout: path.resolve(__dirname, 'src', 'logout.html'), // Specify the main entry point
                agent_management: path.resolve(__dirname, 'src', 'agent-management.html'), // Specify the main entry point
                agent_settings: path.resolve(__dirname, 'src', 'agent-settings.html'), // Specify the main entry point
                staff_management: path.resolve(__dirname, 'src', 'staff-management.html'), // Specify the main entry point
                staff_settings: path.resolve(__dirname, 'src', 'staff-settings.html'), // Specify the main entry point
                change_password: path.resolve(__dirname, 'src', 'change-password.html'), // Specify the main entry point
                roles: path.resolve(__dirname, 'src', 'roles.html'), // Specify the main entry point
            },
        },
    },
});
