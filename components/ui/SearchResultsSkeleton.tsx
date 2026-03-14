type Props = {
  compact?: boolean;
};

export default function SearchResultsSkeleton({ compact = false }: Props) {
  const count = compact ? 2 : 4;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
      {!compact && (
        <div className="mb-10 flex justify-center">
          <div className="h-5 w-56 animate-pulse rounded bg-black/10" />
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>
            <div className="aspect-[4/3] animate-pulse bg-black/10" />
            <div className="pt-3">
              <div className="mb-2 h-3 w-16 animate-pulse rounded bg-black/10" />
              <div className="h-6 w-4/5 animate-pulse rounded bg-black/10" />
              <div className="mt-2 h-6 w-3/4 animate-pulse rounded bg-black/10" />
              <div className="mt-3 h-4 w-28 animate-pulse rounded bg-black/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}