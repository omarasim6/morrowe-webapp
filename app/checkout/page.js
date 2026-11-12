import CheckoutForm from '@/components/checkout/CheckoutForm';
import { RETURN_DAYS } from '@/lib/site';
export const metadata = { title: 'Checkout' };
export default function Page() { return <CheckoutForm returnDays={RETURN_DAYS} />; }
