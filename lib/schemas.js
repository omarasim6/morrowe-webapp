import { z } from 'zod';
// Browser-side validation only. Every value below is checked and then discarded: nothing is stored, logged or sent anywhere.
const phone = z.string().transform(s => s.replace(/[\s-]/g, '')).refine(v => /^(\+92|92|0)3\d{9}$/.test(v), 'Enter a valid Pakistani mobile number, e.g. 0300 1234567');
const email = z.string().trim().toLowerCase().email('Enter a valid email address').max(120);
const name = z.string().trim().min(2, 'Name must be at least 2 characters').max(80).regex(/^[\p{L}][\p{L} .'-]*$/u, 'Name can only contain letters');

export const checkoutSchema = z.object({
  name, email, phone,
  address: z.string().trim().min(10, 'Please enter your full address (house, street, area)').max(200),
  country: z.string().trim().min(2, 'Select your country').max(60),
  city: z.string().trim().min(2, 'Select your city').max(60),
  notes: z.string().trim().max(300, 'Notes must be under 300 characters').optional().or(z.literal('')),
  payment: z.enum(['cod', 'online'], { errorMap: () => ({ message: 'Choose a payment method' }) }),
});
export const contactSchema = z.object({
  name, email,
  subject: z.string().trim().min(3, 'Subject is too short').max(100),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(1000),
});
export const trackSchema = z.object({
  code: z.string().trim().toUpperCase().regex(/^MRW-[A-Z0-9]{6}$/, 'Order codes look like MRW-AB12CD'),
});
export const reviewSchema = z.object({
  rating: z.number({ required_error: 'Choose a star rating', invalid_type_error: 'Choose a star rating' }).int('Choose a star rating').min(1, 'Choose a star rating').max(5, 'Choose a star rating'),
  title: z.string().trim().max(80, 'Title must be under 80 characters').optional().or(z.literal('')),
  body: z.string().trim().min(10, 'Please write at least 10 characters').max(1000, 'Reviews must be under 1000 characters'),
});
const luhn = (n) => { let s = 0, d = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (d) { x *= 2; if (x > 9) x -= 9; } s += x; d = !d; } return s % 10 === 0; };
export const cardSchema = z.object({
  holder: name,
  number: z.string().transform(s => s.replace(/\s/g, '')).refine(v => /^\d{13,19}$/.test(v) && luhn(v), 'Enter a valid card number'),
  expiry: z.string().refine(v => {
    const m = /^(\d{2})\/(\d{2})$/.exec(v); if (!m) return false;
    const mm = +m[1], yy = 2000 + +m[2]; if (mm < 1 || mm > 12) return false;
    return new Date(yy, mm, 1) > new Date();
  }, 'Use a future date as MM/YY'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC is 3 or 4 digits'),
});
export const fieldErrors = (err) => Object.fromEntries(err.issues.map(i => [i.path[0], i.message]).reverse());
