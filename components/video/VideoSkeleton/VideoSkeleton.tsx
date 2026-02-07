"use client";

type Props = {
  sections?: number;
  cardsPerSection?: number;
};

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-black/10 ${className}`} />
);

export function VideoHeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* ทำให้สูงพอๆกับ hero จริง เพื่อกัน layout shift */}
      <div className="relative w-full aspect-square lg:aspect-[1837/732] max-h-[90vh] bg-black/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-12 w-[60%] max-w-[520px]" />
        </div>
      </div>
    </section>
  );
}

export function HighlightSectionSkeleton({
  titleWidthClass = "w-48",
  cards = 4,
}: {
  titleWidthClass?: string;
  cards?: number;
}) {
  return (
    <section className="px-4 md:px-8 py-8">
      <Skeleton className={`h-7 ${titleWidthClass}`} />

      <div className="mt-6 flex gap-4 overflow-hidden">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px]">
            <Skeleton className="h-44 w-full rounded-xl" />
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-[65%]" />
              <Skeleton className="h-3 w-[40%]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function VideoPageSkeleton({ sections = 3, cardsPerSection = 4 }: Props) {
  return (
    <div className="mx-auto">
      {Array.from({ length: sections }).map((_, i) => (
        <HighlightSectionSkeleton key={i} cards={cardsPerSection} />
      ))}
    </div>
  );
}
