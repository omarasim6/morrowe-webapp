// The social-proof caveat: ratings and reviews are sample content for the university project.
export default function DemoNote({ className = '', children }) {
  return (
    <p role="note" className={`rounded-2xl border border-forest-800/25 bg-sage-100 px-4 py-3 text-sm text-forest-800 ${className}`}>
      <strong className="font-semibold">Demo ratings and reviews.</strong>{' '}
      {children || 'The star ratings and reviews on this site are sample content for a university project. They are not from real customers.'}
    </p>
  );
}
