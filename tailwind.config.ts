import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        modalBackground: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.4s ease-out',
        modalBackground: 'modalBackground 0.4s ease',
      },
      minWidth:{
        'button-min-width': '8rem'
      },
      boxShadow: {
        'button-shadow': '0 4px 8px 0 rgba(50, 50, 71, 0.25)'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "var(--white)",
        gray: "var(--gray)",
        black: "var(--black)",
        cerulean: {
          100: '#E8F1FA',
          200: '#C2DAF2',
          300: '#99C1EA',
          400: '#669CD7',
          500: '#3C6CAB',
          600: '#345C91',
          700: '#2B4A77',
          800: '#21385E',
          900: '#172844',
        },
        red: {
          100: '#FCEAE9',
          200: '#F9CFCD',
          300: '#F3A9A6',
          400: '#EB847F',
          500: '#E46E6A',
          600: '#C65F5C',
          700: '#A5504E',
          800: '#843F3D',
          900: '#672F2E',
        },
        slate: {
          100: '#EEF1F4',
          200: '#D3D7DE',
          300: '#AEB4C2',
          400: '#8991A6',
          500: '#4C5567',
          600: '#404858',
          700: '#343A49',
          800: '#282B3A',
          900: '#1C1E2A',
        },
        teal: {
          100: '#E4F4FA',
          200: '#BCE4F3',
          300: '#94D3EC',
          400: '#6CB9DA',
          500: '#408FAF',
          600: '#35798E',
          700: '#2B6475',
          800: '#204E5C',
          900: '#163944',
        },
        amber: {
          100: '#FBECE2',
          200: '#F7D1B9',
          300: '#F0B08C',
          400: '#E8975F',
          500: '#E08E49',
          600: '#C47A3F',
          700: '#A46735',
          800: '#854D2B',
          900: '#693C22',
        },
        green: {
          100: '#EAF7ED',
          200: '#C7EAD3',
          300: '#9BDDB5',
          400: '#73C89B',
          500: '#69B87E',
          600: '#57A068',
          700: '#488456',
          800: '#396844',
          900: '#2A4D32',
        },
        obsidian: {
          100: '#E5F2F6',
          200: '#B9DCE6',
          300: '#8BC6D6',
          400: '#5FAFC6',
          500: '#264D61',
          600: '#214355',
          700: '#1B3848',
          800: '#152D3A',
          900: '#0E212C',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
