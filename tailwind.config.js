/** @type {import('tailwindcss').Config} */
import colors from './src/theme/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3560C1',
        background: colors.light.background,
        text: colors.light.text,
        divider: colors.light.divider,
        grey: colors.light.grey,
        secondary: colors.light.secondary,
        error: colors.light.error,
        warning: colors.light.warning,
        info: colors.light.info,
        success: colors.light.success,
        brand: colors.light.brand,
        skittles: colors.light.skittles,
        // Dark mode colors
        'dark-bg': colors.dark.background,
        'dark-text': colors.dark.text,
        'dark-divider': colors.dark.divider,
        'dark-grey': colors.dark.grey,
        'dark-primary': colors.dark.primary,
        'dark-secondary': colors.dark.secondary,
        'dark-error': colors.dark.error,
        'dark-warning': colors.dark.warning,
        'dark-info': colors.dark.info,
        'dark-success': colors.dark.success,
        'dark-brand': colors.dark.brand,
        'dark-skittles': colors.dark.skittles,
      },
    },
  },
  plugins: [],
} 