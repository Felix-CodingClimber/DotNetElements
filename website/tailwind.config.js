/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}", "./docs/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        "primary": "var(--ifm-color-primary)",
        "primary-dark": "var(--ifm-color-primary-dark)",
        "primary-darker": "var(--ifm-color-primary-darker)",
        "primary-darkest": "var(--ifm-color-primary-darkest)",
        "primary-light": "var(--ifm-color-primary-light)",
        "primary-lighter": "var(--ifm-color-primary-lighter)",
        "primary-lightest": "var(--ifm-color-primary-lightest)",
        "primary-contrast": "var(--color-primary-contrast)",
        "primary-text": "var(--color-primary-text)",
      }
    },
  },
  plugins: [],
  darkMode: ["class", '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
};
