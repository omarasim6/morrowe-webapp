import Skeleton from '@/components/ui/Skeleton';
export default function Loading() {
  return (
    <div className="wrap py-12" role="status" aria-label="Loading checkout"><span className="sr-only">Loading checkout…</span>
      <Skeleton className="h-12 w-1/2 max-w-sm" /><div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]"><div className="space-y-4"><Skeleton className="h-14 w-full" /><Skeleton className="h-14 w-full" /><Skeleton className="h-14 w-full" /><Skeleton className="h-32 w-full" /></div><Skeleton className="h-72 w-full rounded-card" /></div>
    </div>
  );
}
