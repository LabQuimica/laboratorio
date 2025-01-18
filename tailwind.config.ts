import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'light-bg': '#EEEFF1',
        'dark-bg': '#171717',
      },
      input: {
        default: {
          backgroundColor: '#CCD4DE',
          borderColor: 'transparent',
          borderRadius: '50%',
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
