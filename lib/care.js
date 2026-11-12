// Care & materials guide content. General guidance by material, not product claims: where a product listing does not
// state something (see db/products.mjs), this guide does not guess it. Keyed by product slug; unknown slugs get GENERIC.
export const GENERIC = ['Wash before first use.', 'Follow any care label that comes with the product.'];
export const CARE = {
  'reusable-bottle': {
    steps: ['Wash before first use, then hand wash with warm water, mild soap and a bottle brush. Rinse well.', 'Dry fully with the cap off before storing, so no smell builds up.', 'Skip bleach and abrasive scourers: they can scratch or dull the finish.', 'Do not microwave it.'],
    materials: ['stainless-steel'],
  },
  'reusable-cup': {
    steps: ['Wash before first use, then hand wash with warm water and mild soap.', 'Wash the lid by hand and do not soak it. Dry both parts fully before putting the lid back on.', 'Skip bleach and abrasive scourers.', 'Do not microwave it.'],
    materials: ['bamboo'],
  },
  'glass-lunch-box': {
    steps: ['Wash before first use. Wash the glass with warm water and mild soap.', 'Wash the bamboo lid by hand, quickly, and never soak it. Dry it upright.', 'Avoid sudden temperature changes, such as hot food straight into a cold box or a hot box under cold water.', 'If the glass is chipped or cracked, stop using it.'],
    materials: ['borosilicate-glass', 'bamboo'],
  },
  'canvas-tote-bag': {
    steps: ['Spot clean marks with a damp cloth and a little mild soap.', 'If it needs a full wash, use cool water and air dry it. Canvas can shrink or fade with heat.', 'Do not put anything sharp inside, and keep it away from damp for long periods.'],
    materials: ['canvas'],
  },
  'everyday-pouch': {
    steps: ['Wipe clean with a damp cloth and a little mild soap.', 'Air dry with the zip open. Keep it away from direct heat.', 'Do not put anything sharp inside, and do not overfill the zip.'],
    materials: ['textured-fabric'],
  },
};
export const MATERIALS = {
  'stainless-steel': { name: 'Stainless steel', about: 'A tough, rust-resistant metal that does not take on flavours easily. It can dent if dropped, so cushion it in your bag.' },
  'borosilicate-glass': { name: 'Borosilicate glass', about: 'Glass made to cope with temperature changes better than everyday glass. It is still glass: it can chip or break if knocked or dropped.' },
  bamboo: { name: 'Bamboo', about: 'A natural material, so grain and colour vary from piece to piece. It does not like soaking or dishwashers, so wash by hand and dry it well.' },
  canvas: { name: 'Unbleached canvas', about: 'A sturdy woven fabric left in its natural colour, so small variations in tone are normal. Heat can shrink or fade it.' },
  'textured-fabric': { name: 'Textured fabric', about: 'A soft, patterned fabric that wipes clean easily. Keep sharp objects and heat away from it.' },
};
