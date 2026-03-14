function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-black/10 ${className}`} />;
}

function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="mx-auto max-w-[1280px] px-6 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-6 md:px-8 md:pb-12 md:pt-8 lg:px-10 lg:pb-14 lg:pt-8">
        <div className="flex min-h-[264px] flex-col md:min-h-[312px] lg:min-h-[338px]">
          <div className="flex items-start justify-between">
            <SkeletonBlock className="h-[82px] w-[82px] rounded-full border border-[#FE552C]/40 bg-white/10 sm:h-[96px] sm:w-[96px] md:h-[118px] md:w-[118px]" />
            <SkeletonBlock className="hidden h-[126px] w-[126px] rounded-full border border-[#FE552C]/40 bg-white/10 md:block" />
          </div>

          <div className="mt-6 max-w-[760px]">
            <SkeletonBlock className="h-3 w-28 bg-white/10" />
            <SkeletonBlock className="mt-5 h-12 w-64 bg-white/10 sm:h-14 md:h-16" />
            <SkeletonBlock className="mt-3 h-12 w-56 bg-white/10 sm:h-14 md:h-16" />
            <SkeletonBlock className="mt-5 h-3 w-80 max-w-full bg-white/10" />

            <div className="mt-7 flex gap-10">
              <div>
                <SkeletonBlock className="h-8 w-12 bg-white/10" />
                <SkeletonBlock className="mt-2 h-3 w-12 bg-white/10" />
              </div>
              <div>
                <SkeletonBlock className="h-8 w-16 bg-white/10" />
                <SkeletonBlock className="mt-2 h-3 w-14 bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardSkeleton({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`${dark ? "bg-[#251F16]" : "bg-[#D9D2C5]"} overflow-hidden`}>
      <SkeletonBlock className="aspect-[1.62/1] w-full" />
      <div className="p-4">
        <SkeletonBlock className={`h-3 w-20 ${dark ? "bg-white/10" : "bg-black/10"}`} />
        <SkeletonBlock className={`mt-3 h-5 w-[82%] ${dark ? "bg-white/10" : "bg-black/10"}`} />
        <SkeletonBlock className={`mt-2 h-5 w-[70%] ${dark ? "bg-white/10" : "bg-black/10"}`} />
        <SkeletonBlock className={`mt-6 h-px w-[78%] ${dark ? "bg-white/10" : "bg-black/10"}`} />
        <div className="mt-2 flex justify-between">
          <SkeletonBlock className={`h-3 w-20 ${dark ? "bg-white/10" : "bg-black/10"}`} />
          <SkeletonBlock className={`h-3 w-12 ${dark ? "bg-white/10" : "bg-black/10"}`} />
        </div>
      </div>
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="overflow-hidden border border-black/8 bg-[#E7E2D8]">
      <div className="grid grid-cols-1 xl:grid-cols-[4fr_6fr_3fr]">
        <SkeletonBlock className="aspect-[4/3] w-full xl:min-h-[228px]" />
        <div className="p-6">
          <div className="mb-3 flex justify-end">
            <SkeletonBlock className="h-8 w-28 rounded-full" />
          </div>
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="mt-4 h-7 w-[88%]" />
          <SkeletonBlock className="mt-2 h-7 w-[74%]" />
          <SkeletonBlock className="mt-4 h-3 w-[90%]" />
          <SkeletonBlock className="mt-2 h-3 w-[72%]" />
          <SkeletonBlock className="mt-6 h-px w-[78%]" />
          <div className="mt-2 flex justify-between">
            <SkeletonBlock className="h-3 w-20" />
            <SkeletonBlock className="h-3 w-12" />
          </div>
        </div>
        <div className="hidden p-6 xl:block">
          <SkeletonBlock className="h-8 w-5" />
          <SkeletonBlock className="mt-4 h-3 w-24" />
          <SkeletonBlock className="mt-2 h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="bg-[#EFEEE7]">
      <HeroSkeleton />

      <div className="mx-auto w-full max-w-[1280px] px-4 pb-10 pt-6 md:px-6 md:pb-14 lg:px-8">
        <div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <SkeletonBlock className="h-10 w-48" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-9 w-24 rounded-full" />
            ))}
          </div>
        </div>

        <div className="mb-[6px]">
          <FeaturedSkeleton />
        </div>

        <div className="grid grid-cols-1 gap-[6px] xl:grid-cols-12">
          <div className="xl:col-span-8">
            <CardSkeleton dark />
          </div>
          <div className="xl:col-span-4">
            <CardSkeleton />
          </div>
          <div className="xl:col-span-4">
            <CardSkeleton />
          </div>
          <div className="xl:col-span-4">
            <CardSkeleton dark />
          </div>
          <div className="xl:col-span-4">
            <CardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}