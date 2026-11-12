import Skeleton from '@/components/ui/Skeleton';
export default function Loading() {
  return (
    <div role="status" aria-label="Loading products"><span className="sr-only">Loading products…</span>
      <div className="bg-sage-100 py-16"><div className="wrap"><Skeleton className="h-4 w-40" /><Skeleton className="mt-4 h-16 w-2/3 max-w-lg" /></div></div>
      <div className="wrap py-12"><Skeleton className="h-12 w-full max-w-xl" />
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <div key={i}><Skeleton className="aspect-[4/5] rounded-card" /><Skeleton className="mt-4 h-4 w-3/4" /><Skeleton className="mt-2 h-4 w-1/3" /></div>)}</div></div>
    </div>
  );
}
