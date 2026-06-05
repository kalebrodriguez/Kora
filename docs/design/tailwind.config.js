/** @type {import('tailwindcss').Config} */
// Tokens lifted from DESIGN.md (Coursue screenshot → ServeTrack)
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6C5CE7',
        'primary-deep': '#5A4BD4',
        'banner-from': '#7B6CF0',
        'banner-to': '#6453E0',
        ink: '#1B1B2F',
        'ink-button': '#161622',
        muted: '#8A8AA3',
        canvas: '#F5F6FB',
        surface: '#FFFFFF',
        'accent-lavender': '#ECEAFB',
        'accent-pink': '#FBE4F1',
        'accent-sky': '#DDF0FB',
        'icon-pink': '#EC68A6',
        'icon-sky': '#4DB7E8',
        'chart-track': '#CFC9F4',
        danger: '#F4663F',
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        chip: '12px',
        card: '20px',
      },
      boxShadow: {
        card: '0 10px 30px rgba(82, 78, 137, 0.06)',
        raised: '0 16px 40px rgba(108, 92, 231, 0.14)',
      },
      maxWidth: {
        shell: '1440px',
      },
    },
  },
  plugins: [],
}
