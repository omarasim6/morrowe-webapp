import Skeleton from '@/components/ui/Skeleton';
export default function Loading() {
  return (
    <div className="wrap py-16" role="status" aria-label="Loading"><span className="sr-only">Loading…</span>
      <Skeleton className="h-12 w-2/3 max-w-md" /><Skeleton className="mt-4 h-5 w-1/2 max-w-sm" />
      <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <div key={i}><Skeleton className="aspect-[4/5] rounded-card" /><Skeleton className="mt-4 h-4 w-3/4" /></div>)}</div>
    </div>
  );
}
