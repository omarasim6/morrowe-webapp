import LegalPage from '@/components/LegalPage';
import { fmt } from '@/lib/format';
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE, DELIVERY_TIMES, RETURN_DAYS } from '@/lib/site';
export const metadata = { title: 'Returns & shipping' };

export default function Returns() {
  const days = RETURN_DAYS;
  const sections = [
    { id: 'delivery', title: 'Delivery', body: [
      `We deliver across Pakistan. Delivery costs ${fmt(DELIVERY_FEE)}, and is free when your order is ${fmt(FREE_DELIVERY_THRESHOLD)} or more.`,
      `Estimated delivery times: ${DELIVERY_TIMES} These are estimates, counted from when we confirm your order, and can be longer during sales, holidays or bad weather.`,
      'Our rider would call the mobile number you gave at checkout, so keep your phone on and make sure someone can receive the parcel.',
    ] },
    { id: 'payment', title: 'Payment on delivery', body: [
      'Orders are paid in cash when the parcel arrives, unless another method is shown at checkout. Please have the exact amount ready if you can.',
    ] },
    { id: 'tracking', title: 'Tracking your order', body: [
      'Use Track order with your order code. Your order code is shown after checkout.',
    ] },
    { id: 'check', title: 'When your parcel arrives', body: [
      'Please check the parcel before or soon after you accept it. If something is damaged, faulty or not what you ordered, email us with your order code and a photo as soon as you can, ideally within 48 hours of delivery.',
      'If an item arrives damaged or faulty, we replace it free of charge.',
    ] },
    { id: 'returns', title: `Returns within ${days} days`, body: [
      `You can return unused items in their original condition and packaging within ${days} days of delivery.`,
      { list: [
        'Email us with your order code and which item you want to return.',
        'We will arrange pickup, or tell you where to send it.',
        'We check the item when it reaches us. Items that are used, washed, damaged by the customer or missing their packaging may be refused.',
      ] },
    ] },
    { id: 'refunds', title: 'Refunds', body: [
      'Once we have received and checked your return, we refund the price of the returned item. Because most orders are paid in cash, we will ask for a bank or mobile wallet account to send the refund to. We aim to refund within 7 working days of approving the return.',
      'The delivery fee is refunded only when the return is because of our mistake: a damaged, faulty or wrong item.',
    ] },
    { id: 'cancel', title: 'Cancelling an order', body: [
      'You can cancel for free before your order is dispatched. Email us with your order code as soon as possible. Once an order has shipped, the returns process above applies.',
    ] },
    { id: 'help', title: 'Need help?', body: ['Visit the Contact page and have your order code ready.'] },
  ];
  return <LegalPage current="/returns" eyebrow="Help" title="Returns &" accent="shipping" sections={sections}
    intro="How delivery works, what to do if something is wrong, and how returns and refunds are handled." />;
}
