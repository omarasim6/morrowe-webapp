import Skeleton from '@/components/ui/Skeleton';
export default function Loading() {
  return (
    <div className="wrap py-12" role="status" aria-label="Loading order tracking"><span className="sr-only">Loading order tracking…</span>
      <Skeleton className="h-12 w-2/3 max-w-md" /><Skeleton className="mt-6 h-14 w-full max-w-md" /><Skeleton className="mt-4 h-14 w-full max-w-md" />
    </div>
  );
}
