import LegalPage from '@/components/LegalPage';
import { fmt } from '@/lib/format';
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE } from '@/lib/site';
export const metadata = { title: 'Terms of sale' };

const sections = [
  { id: 'about', title: 'About these terms', body: [
    'These terms apply when you order from the Morrowe website. By placing an order you confirm that you have read them and agree to them, together with our Returns & shipping page and Privacy policy.',
  ] },
  { id: 'orders', title: 'Placing an order', body: [
    'Your order is an offer to buy. It becomes a contract when we confirm it. For cash on delivery orders we would send a confirmation by email.',
    'We may decline or cancel an order, for example if an item is out of stock, the delivery details look wrong, or there is a pricing error. If we cancel, we will tell you and refund anything you have paid.',
    'You must give accurate contact and delivery details. We are not responsible for failed or late delivery caused by wrong details or an unreachable phone number.',
  ] },
  { id: 'prices', title: 'Prices and payment', body: [
    `All prices are set in Pakistani rupees (Rs). If you pick another display currency from the globe menu, amounts are approximate conversions for reference only, and your order is still charged in Pakistani rupees. Delivery is ${fmt(DELIVERY_FEE)}, free for orders of ${fmt(FREE_DELIVERY_THRESHOLD)} or more. The total you see at checkout is the total you pay.`,
    'The price at the time you order is the price you pay. We may change prices at any time, but changes do not affect orders already placed.',
    'Orders are paid in cash on delivery unless another payment method is shown at checkout.',
  ] },
  { id: 'products', title: 'Products', body: [
    'We try to show our products as accurately as we can. Colours can look slightly different on different screens, and handmade or natural materials such as bamboo and canvas vary a little from piece to piece.',
    'Please follow the care instructions on the product page to get the most from your item.',
  ] },
  { id: 'delivery', title: 'Delivery', body: [
    'Delivery times on the site and in our emails are estimates, not guarantees. See Returns & shipping for details. Ownership and risk pass to you when the parcel is delivered to you.',
  ] },
  { id: 'returns', title: 'Returns and faulty items', body: [
    'Our Returns & shipping page explains how to return an item, and when you get a replacement or refund. Nothing in these terms limits any rights you have under the law that cannot be limited.',
  ] },
  { id: 'liability', title: 'Our responsibility', body: [
    'We are responsible for foreseeable loss caused by our breach of these terms, up to the price of the products concerned. We are not responsible for indirect or unforeseeable loss, or for delays outside our control.',
  ] },
  { id: 'site', title: 'Using the website', body: [
    'Please do not misuse the site, try to break or overload it, or place orders you do not intend to accept. The Morrowe name, logo, photos and text belong to Morrowe and may not be copied without permission.',
  ] },
  { id: 'changes', title: 'Changes and governing law', body: [
    'We may update these terms. The version on this page when you place your order applies to that order. These terms are governed by the laws of Pakistan.',
  ] },
  { id: 'contact', title: 'Questions', body: ['Use the Contact page or reply to your order confirmation email.'] },
];

export default function Terms() {
  return <LegalPage current="/terms" eyebrow="Legal" title="Terms of" accent="sale" sections={sections}
    intro="The ground rules for ordering from Morrowe, in plain language." />;
}
