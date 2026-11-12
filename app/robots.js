// A demo store: disallow everything so search engines never list a fake shop as real.
export default function robots() { return { rules: [{ userAgent: '*', disallow: '/' }] }; }
