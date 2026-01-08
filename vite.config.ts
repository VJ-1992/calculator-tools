import { defineConfig } from 'vite';

export default defineConfig({
  base: '/calculator-tools/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        discount: 'discount-calculator.html',
        interest: 'simple-interest-calculator.html',
        profit: 'profit-margin-calculator.html',
        about: 'about.html',
        contact: 'contact.html',
        privacy: 'privacy-policy.html',
        terms_conditions: 'terms-conditions.html',
        terms: 'terms.html',
      },
    },
    outDir: 'dist',
  },
});