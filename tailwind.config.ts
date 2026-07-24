import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        'neon-green': '#00ff88',
        'neon-blue': '#00d4ff',
        surface: '#0f0f1a',
        border: '#1a1a2e',
        muted: '#4a4a6a',
        text: '#e2e8f0',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.3)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.3)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
