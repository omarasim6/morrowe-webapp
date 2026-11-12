import LegalPage from '@/components/LegalPage';
export const metadata = { title: 'Privacy policy' };

const sections = [
  { id: 'summary', title: 'The short version', body: [
    'This is a university demo, so it is built to keep nothing about you. Anything you type into a form is checked inside your own browser and then thrown away. There is no database, no email sending, no analytics and no advertising trackers.',
  ] },
  { id: 'collect', title: 'What happens to what you type', body: [
    { list: [
      'Checkout (name, email, mobile number, address, city, notes): checked in your browser, then discarded. Only the items and totals of your demo order are kept, in the memory of the open tab, with no personal details attached.',
      'Test card details: checked in your browser and discarded. No real payment is made and nothing is sent to a payment provider. Please never type a real card number.',
      'Contact form, email sign-up and product reviews: checked in your browser, then discarded. Nothing is sent, stored or published.',
      'Track my order: you enter an order code only. It is looked up in your tab’s memory.',
      'Share my wishlist: the link contains product names only.',
    ] },
    'We recommend made-up details for every form. The site cannot see, store or send them, but it is a good habit.',
  ] },
  { id: 'storage', title: 'Cookies and browser storage', body: [
    'No cookies. Your browser keeps a few small, non-personal items on your own device so the demo works: your cart (product and quantity), your wishlist, whether you claimed the welcome offer, and the products you recently viewed. A short-lived session flag remembers that the welcome pop-up has been shown. None of these contain personal details and none are sent anywhere.',
    'The “Reset demo” button in the footer removes all of them, and clears any demo orders held in memory.',
  ] },
  { id: 'share', title: 'Who we share it with', body: [
    'Nobody. The site makes no requests to third parties, and its security settings (a Content-Security-Policy) tell your browser to block any attempt to send data to another website. Fonts and images are served from the site itself.',
    'The page you are reading is hosted by whoever runs this demo, and their server may keep ordinary access logs (such as the addresses of pages requested). Those logs never contain what you type into forms, because that never leaves your browser.',
  ] },
  { id: 'keep', title: 'How long we keep it', body: [
    'Form entries: until you leave the page. Demo orders: until you refresh or close the tab. Cart, wishlist and offer choice: until you clear them or press Reset demo.',
  ] },
  { id: 'rights', title: 'Your choices', body: [
    'Since nothing personal is stored, there is nothing for us to show, correct or delete. You can clear your browser’s site data at any time.',
  ] },
  { id: 'changes', title: 'Changes to this policy', body: [
    'If the demo changes how it handles information, this page and its date will change too.',
  ] },
  { id: 'contact', title: 'Contact', body: ['For questions about this project, use the Contact page.'] },
];

export default function Privacy() {
  return <LegalPage current="/privacy" eyebrow="Legal" title="Privacy" accent="policy" sections={sections}
    intro="What this demo does with what you type: nothing is kept." />;
}
