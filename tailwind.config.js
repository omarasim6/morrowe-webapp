/** Brand tokens live here and in app/globals.css (:root). Derived tints are documented in docs/DESIGN_TOKENS.md */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#123C2F', 600: '#2F6B56', 800: '#123C2F', 950: '#0B1713' },
        ink: { DEFAULT: '#0B1713', muted: '#3F5149' },
        sage: { DEFAULT: '#A8C5A0', 100: '#E3ECDD', 300: '#A8C5A0' },
        cream: { DEFAULT: '#F5F3EA', 50: '#F5F3EA', 200: '#EBE7D6' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        num: ['var(--font-grotesk)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'Georgia', 'Times New Roman', 'serif'],
      },
      borderRadius: { card: '28px', 'card-lg': '36px' },
      boxShadow: {
        soft: '0 30px 60px -20px rgb(18 60 47 / .35)',
        lift: '0 18px 40px -18px rgb(18 60 47 / .45)',
      },
      transitionDuration: { fast: '150ms', base: '300ms', slow: '600ms', hero: '900ms' },
      transitionTimingFunction: { 'out-expo': 'cubic-bezier(.22,1,.36,1)', 'in-out-soft': 'cubic-bezier(.65,0,.35,1)' },
      fontSize: { hero: ['clamp(2.75rem, 7vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }] },
    },
  },
  plugins: [],
};
