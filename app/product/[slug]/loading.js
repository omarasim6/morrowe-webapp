import Skeleton from '@/components/ui/Skeleton';
export default function Loading() {
  return (
    <div className="wrap py-12" role="status" aria-label="Loading product"><span className="sr-only">Loading product…</span>
      <div className="grid gap-10 md:grid-cols-2 md:gap-14"><Skeleton className="aspect-square w-full rounded-card-lg" /><div><Skeleton className="h-4 w-32" /><Skeleton className="mt-4 h-12 w-3/4" /><Skeleton className="mt-4 h-8 w-32" /><Skeleton className="mt-6 h-20 w-full max-w-lg" /><Skeleton className="mt-8 h-14 w-full max-w-md" /></div></div>
    </div>
  );
}
