export default function Loading() {
  return (
    <div className="bg-[#b0b1b3]">
      <div className="relative w-full overflow-hidden">
        <div className="w-full h-[30vh] sm:h-[30vh] md:h-[45vh] lg:h-[45vh] xl:h-[40vh] max-h-[520px] bg-neutral-200 animate-pulse" />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-20">
        <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full bg-neutral-200 animate-pulse aspect-[3/2] lg:aspect-[4/3]" />

              <div className="h-4 w-24 bg-neutral-200 animate-pulse mt-3" />

              <div className="h-6 sm:h-7 w-5/6 bg-neutral-200 animate-pulse" />
              <div className="h-6 sm:h-7 w-3/5 bg-neutral-200 animate-pulse" />

              <div className="h-5 w-40 bg-neutral-200 animate-pulse" />
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <div className="h-11 w-40 rounded-full bg-neutral-200 animate-pulse" />
        </div>
      </section>
    </div>
  );
}
