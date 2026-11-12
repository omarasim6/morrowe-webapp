'use client';
// Last-resort boundary for failures in the root layout: renders its own <html>/<body> with inline styles (no dependence on the app shell or CSS).
export default function GlobalError({ reset }) {
  const btn = { display: 'inline-block', padding: '12px 22px', borderRadius: 999, fontWeight: 600, fontSize: 15, textDecoration: 'none', cursor: 'pointer', border: '1.5px solid #123C2F' };
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#F5F3EA', color: '#0B1713', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif', textAlign: 'center', padding: 24 }}>
        <main>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-compact-on-light.png" alt="Morrowe" width="180" height="40" style={{ height: 40, width: 'auto' }} />
          <h1 style={{ fontSize: 'clamp(2rem,6vw,3rem)', margin: '28px 0 12px', color: '#123C2F' }}>That didn’t go to plan.</h1>
          <p style={{ maxWidth: 420, margin: '0 auto 28px', lineHeight: 1.6 }}>Something went wrong on our side. Please try again in a moment.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => reset()} style={{ ...btn, background: '#123C2F', color: '#F5F3EA' }}>Try again</button>
            <a href="/shop" style={{ ...btn, color: '#123C2F' }}>Back to the shop</a>
            <a href="/contact" style={{ ...btn, color: '#123C2F' }}>Contact us</a>
          </div>
        </main>
      </body>
    </html>
  );
}
