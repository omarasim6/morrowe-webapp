import { Truck, HandCoins, RotateCcw, MessageCircle, ShieldCheck, Leaf, Search, ShoppingBag, ArrowRight, ArrowUpRight, ArrowUp, ChevronLeft, ChevronRight, ChevronDown, X, Menu, Check, Plus, Minus, Package, Copy, GlassWater, CupSoda, Backpack, UtensilsCrossed, Recycle, Sprout, Clock, Mail, Banknote, Heart, Gift, Tag, Share2, MessageSquare, Globe } from 'lucide-react';
// One consistent stroke (1.5) and decorative-by-default. Import icons individually, never the whole set.
const w = (C) => function Icon({ size = 20, ...p }) { return <C size={size} strokeWidth={1.5} aria-hidden="true" focusable="false" {...p} />; };
export const I = {
  Truck: w(Truck), HandCoins: w(HandCoins), RotateCcw: w(RotateCcw), MessageCircle: w(MessageCircle), ShieldCheck: w(ShieldCheck), Leaf: w(Leaf),
  Search: w(Search), ShoppingBag: w(ShoppingBag), ArrowRight: w(ArrowRight), ArrowUpRight: w(ArrowUpRight), ArrowUp: w(ArrowUp),
  ChevronLeft: w(ChevronLeft), ChevronRight: w(ChevronRight), ChevronDown: w(ChevronDown), X: w(X), Menu: w(Menu), Check: w(Check), Globe: w(Globe),
  Plus: w(Plus), Minus: w(Minus), Package: w(Package), Copy: w(Copy), GlassWater: w(GlassWater), CupSoda: w(CupSoda), Backpack: w(Backpack),
  UtensilsCrossed: w(UtensilsCrossed), Recycle: w(Recycle), Sprout: w(Sprout), Clock: w(Clock), Mail: w(Mail),
  Banknote: w(Banknote), Heart: w(Heart), Gift: w(Gift), Tag: w(Tag), Share2: w(Share2), MessageSquare: w(MessageSquare),
};
