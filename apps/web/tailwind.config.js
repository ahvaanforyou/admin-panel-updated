/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4E1D1D',
          dark: '#3A1414',
          light: '#6B2B2B',
          soft: '#FAF8F6',
          border: '#E8E2DE',
        },
        theme: {
          wedding: '#FFC655',
          'wedding-light': '#FFF4D6',
          baby: '#0776C6',
          'baby-light': '#E8F5FF',
          birthday: '#F7526C',
          'birthday-light': '#FFF0F3',
          house: '#314A31',
          'house-light': '#EEF3EC',
        },
        surface: {
          bg: '#FFFFFF',
          soft: '#FAF8F6',
          border: '#E8E2DE',
          text: '#1F1F1F',
          muted: '#666666',
          subtle: '#8A8A8A',
        }
      },
      fontFamily: {
        primary: ['"SF Pro"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Playwrite US Trad"', '"Playwrite US Modern"', 'cursive'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(78, 29, 29, 0.06)',
        'soft-md': '0 8px 24px -4px rgba(78, 29, 29, 0.08), 0 2px 6px -1px rgba(78, 29, 29, 0.04)',
        'soft-lg': '0 20px 40px -8px rgba(78, 29, 29, 0.12), 0 4px 12px -2px rgba(78, 29, 29, 0.06)',
        'soft-xl': '0 30px 60px -12px rgba(78, 29, 29, 0.16)',
        'glow-wedding': '0 12px 30px -4px rgba(255, 198, 85, 0.35)',
        'glow-baby': '0 12px 30px -4px rgba(7, 118, 198, 0.3)',
        'glow-birthday': '0 12px 30px -4px rgba(247, 82, 108, 0.35)',
        'glow-house': '0 12px 30px -4px rgba(49, 74, 49, 0.3)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.92', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
