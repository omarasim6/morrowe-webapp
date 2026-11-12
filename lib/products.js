// SINGLE SOURCE OF TRUTH for the catalogue (no database). Prices are the confirmed prices, whole PKR (rupees).
// Empty (null) specs are intentionally not shown on the site.
export const PRODUCTS = [
  {
    slug: 'reusable-bottle', name: 'Reusable Bottle', category: 'Drinkware', habit_tag: 'REFILL', tone: 'forest',
    price: 2400,
    description: 'A matte forest green stainless steel bottle with a silver cap. Refill it once, use it every day.',
    material: 'Stainless steel body, silver cap', capacity: '750 ml', dimensions: '30 cm × 7.6 cm', care: null,
    image: { alt: 'Matte forest-green stainless steel Morrowe bottle with a silver cap on a pale green podium', focal_x: 0.5, focal_y: 0.55 },
  },
  {
    slug: 'reusable-cup', name: 'Reusable Coffee Tumbler', category: 'Drinkware', habit_tag: 'REUSE', tone: 'sage',
    price: 1800,
    description: 'An off white cup with a forest green lid. One you reuse instead of throwing away.',
    material: 'Off white metal body, forest-green bamboo lid', capacity: '500 ml', dimensions: '22.5 cm × 7.5 cm', care: null,
    image: { alt: 'Off-white Morrowe reusable coffee tumbler with a forest-green lid on a sage podium', focal_x: 0.5, focal_y: 0.5 },
  },
  {
    slug: 'glass-lunch-box', name: 'Glass Lunch Box', category: 'Food storage', habit_tag: 'PACK', tone: 'forest',
    price: 3200,
    description: 'Borosilicate glass with a bamboo lid. Pack lunch the way you mean to keep doing it. Food not included.',
    material: 'Borosilicate glass body, bamboo lid', capacity: '1200 ml', dimensions: '20 cm × 14.5 cm × 7 cm', care: 'Fragile. Handle with care.',
    image: { alt: 'Morrowe borosilicate glass lunch box with a bamboo lid, filled with a salad, on a sage green podium', focal_x: 0.5, focal_y: 0.5 },
  },
  {
    slug: 'canvas-tote-bag', name: 'Canvas Tote Bag', category: 'Bags', habit_tag: 'CARRY', tone: 'cream',
    price: 1200,
    description: 'Unbleached canvas with stitched handles. Carry more, throw away less.',
    material: 'Unbleached canvas', capacity: null, dimensions: '45 cm × 35 cm', care: 'Do not put anything sharp inside.',
    image: { alt: 'Natural canvas Morrowe tote bag with a printed m. mark and tagline on a sage podium', focal_x: 0.5, focal_y: 0.5 },
  },
  {
    slug: 'everyday-pouch', name: 'Everyday Pouch', category: 'Bags', habit_tag: 'REPEAT', tone: 'forest',
    price: 1100,
    description: 'A textured forest-green pouch with a zipper, for the small things you carry every day.',
    material: 'Textured fabric, zip closure', capacity: null, dimensions: '23 cm × 10 cm × 11 cm', care: 'Do not put anything sharp inside.',
    image: { alt: 'Textured forest-green Morrowe zip pouch with a cream m. mark on a pale green podium', focal_x: 0.5, focal_y: 0.5 },
  },
];
