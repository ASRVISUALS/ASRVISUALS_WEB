// frontend/tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Backgrounds
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F5F5F7',
        'bg-tertiary': '#EFEFEF',
        
        // Brand Red Accent (Refined)
        'brand-red': {
          DEFAULT: '#D90429',
          hover: '#B8031F',
          light: '#E63451',
        },
        
        // Neutral Colors
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        
        // Borders & Dividers
        'border-divider': '#E0E0E0',
        
        // Card Background
        'card-bg': '#F5F5F7',
        
        // Legacy support
        primary: {
          DEFAULT: '#FFFFFF',
          light: '#F5F5F7',
        },
        accent: {
          DEFAULT: '#D90429',
          hover: '#B8031F',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#666666',
        },
        card: {
          bg: '#F5F5F7',
          border: '#E0E0E0',
        },
      },
      fontFamily: {
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
        display: ['"Neue Montreal"', '"Manrope"', 'sans-serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        heading: ['"Neue Montreal"', '"Manrope"', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '0.015em' }],
        'h2': ['2.5rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '0.015em' }],
        'h3': ['1.875rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0.015em' }],
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.015em' }],
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'medium': '0 12px 24px rgba(0, 0, 0, 0.1)',
        'red-glow': '0 0 20px rgba(217, 4, 41, 0.3)',
        'red-glow-lg': '0 0 40px rgba(217, 4, 41, 0.4)',
        'card-lift': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      spacing: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      letterSpacing: {
        'tight': '-0.01em',
        'normal': '0',
        'wide': '0.015em',
        'wider': '0.03em',
        'extra-wide': '0.05em',
      },
    },
  },
  plugins: [],
}