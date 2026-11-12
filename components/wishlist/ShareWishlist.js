'use client';
import { useState } from 'react';
import { useWishlist } from './WishlistProvider';
import { I } from '../ui/icons';
import { shareUrl } from '@/lib/wishlist-share';
// Share the saved items as a link. The link carries the product slugs itself (nothing is stored on the server).
// Phones get the native share sheet (which lists whatever apps the visitor has); everywhere else the link is copied.
export default function ShareWishlist({ slugs }) {
  const { announce } = useWishlist(); const [copied, setCopied] = useState(false);
  const url = () => shareUrl(window.location.origin, slugs);
  async function share() {
    const u = url();
    try { if (navigator.share) { await navigator.share({ title: 'My Morrowe wishlist', text: 'Things I am saving from Morrowe', url: u }); return; } } catch (e) { if (e?.name === 'AbortError') return; }
    try { await navigator.clipboard.writeText(u); setCopied(true); announce('Wishlist link copied.'); setTimeout(() => setCopied(false), 2200); }
    catch { window.prompt('Copy this link to share your wishlist:', u); }
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button type="button" onClick={share} className="btn-ghost">{copied ? <><I.Check size={18} />Link copied</> : <><I.Share2 size={18} />Share wishlist</>}</button>
    </div>
  );
}
