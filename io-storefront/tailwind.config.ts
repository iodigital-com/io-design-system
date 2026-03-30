import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        // io Digital brand palette — mirrors docs/tokens.json
        primary: {
          DEFAULT: '#0000D2',
          hover: '#0000a8',
          active: '#000080',
        },
        beige: '#DCCFC2',
        'off-white': '#EBE8E3',
        orange: {
          DEFAULT: '#ed7f53',
          hover: '#d96a3b',
        },
        pink: '#DCC8C2',
        rouge: {
          DEFAULT: '#a13865',
          hover: '#8a2e54',
        },
        yellow: {
          DEFAULT: '#fdbc75',
          hover: '#f0a952',
        },
        antraciet: {
          DEFAULT: '#454545',
          hover: '#333333',
        },
        grey: {
          1: '#f7f7f7',
          2: '#ebebeb',
          3: '#C4C4C4',
          4: '#747474',
          5: '#F4F4F4',
          6: '#242424',
        },
        success: '#30c58e',
        warning: '#ffa100',
        error: '#ff6161',
        'io-color-primary': 'var(--io-color-primary)',
        'io-color-success': 'var(--io-color-success)',
        'io-color-error': 'var(--io-color-error)',
        'io-text-primary': 'var(--io-text-primary)',
        'io-text-secondary': 'var(--io-text-secondary)',
        'io-text-muted': 'var(--io-text-muted)',
        'io-accent': 'var(--io-accent)',
        'io-accent-bg': 'var(--io-accent-bg)',
        'io-accent-text': 'var(--io-accent-text)',
        'io-bg-base': 'var(--io-bg-base)',
        'io-bg-surface': 'var(--io-bg-surface)',
        'io-bg-raised': 'var(--io-bg-raised)',
        'io-bg-hover': 'var(--io-bg-hover)',
        'io-border': 'var(--io-border)',
        'io-border-focus': 'var(--io-border-focus)',
      },
      spacing: {
        'io-header-height': 'var(--io-header-height)',
        'io-sidebar-nav-width': 'var(--io-sidebar-nav-width)',
        'io-sidebar-config-width': 'var(--io-sidebar-config-width)',
      },
      borderRadius: {
        xs: '4px',
        sm: '9px',
        md: '12px',
        lg: '14px',
        xl: '24px',
        pill: '9999px',
      },
      boxShadow: {
        sm: '0px 2px 4px rgba(0,0,0,0.2)',
        md: '0px 0px 20px rgba(0,0,0,0.1)',
        lg: '0px 10px 40px rgba(0,0,0,0.1)',
      },
      maxWidth: {
        container: '76.5rem',
      },
    },
  },
};

export default config;
