export default function manifest() {
  return {
    name: 'Morrowe',
    short_name: 'Morrowe',
    description: 'Better habits. Less waste.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#123C2F',
    background_color: '#F5F3EA',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
