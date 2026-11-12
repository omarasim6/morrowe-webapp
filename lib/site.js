// Client-safe shared constants for the storefront UI.
export const FREE_DELIVERY_THRESHOLD = 5000;
export const DELIVERY_FEE = 250;
export const RETURN_DAYS = 7;
export const INSTAGRAM_URL = 'https://www.instagram.com/morrowe.pk/';
export const CATEGORIES = ['Drinkware', 'Food storage', 'Bags'];
export const HABIT_WORDS = ['REFILL', 'REUSE', 'PACK', 'CARRY', 'REPEAT'];
const HABITS = { 'reusable-bottle': 'REFILL', 'reusable-cup': 'REUSE', 'glass-lunch-box': 'PACK', 'canvas-tote-bag': 'CARRY', 'everyday-pouch': 'REPEAT' };
export const habitOf = (p) => (p && (p.habit_tag || HABITS[p.slug])) || null;
// stage circle tint per product tone
const TINTS = { forest: '#A8C5A0', ink: '#A8C5A0', sage: '#2F6B56', cream: '#E3ECDD' };
export const tintOf = (tone) => TINTS[tone] || TINTS.forest;
export const DELIVERY_TIMES = 'Karachi, Lahore and Islamabad: 2–3 working days. Other cities: 3–5 working days.';
