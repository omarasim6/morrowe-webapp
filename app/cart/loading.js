import Skeleton from '@/components/ui/Skeleton';
export default function Loading() {
  return (
    <div className="wrap py-12" role="status" aria-label="Loading cart"><span className="sr-only">Loading cart…</span>
      <Skeleton className="h-12 w-1/2 max-w-sm" /><div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]"><div className="space-y-4"><Skeleton className="h-28 w-full" /><Skeleton className="h-28 w-full" /></div><Skeleton className="h-64 w-full rounded-card" /></div>
    </div>
  );
}
