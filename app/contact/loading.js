import Skeleton from '@/components/ui/Skeleton';
export default function Loading() {
  return (
    <div className="wrap py-12" role="status" aria-label="Loading contact"><span className="sr-only">Loading contact…</span>
      <Skeleton className="h-12 w-2/3 max-w-md" /><div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]"><Skeleton className="h-96 w-full rounded-card" /><div className="space-y-4"><Skeleton className="h-24 w-full rounded-card" /><Skeleton className="h-24 w-full rounded-card" /></div></div>
    </div>
  );
}
