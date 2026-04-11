export default function Loading() {
  return (
    <div className="bg-[#EFEEE7]">
      {/* hero skeleton */}
      <div className="h-[240px] w-full animate-pulse bg-black/10 md:h-[320px]" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 md:px-6 md:pb-14">
        <div className="mb-4 h-7 w-32 animate-pulse  bg-black/10" />

        {/* cards skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden  bg-black/10 animate-pulse"
            >
              <div className="aspect-[16/9] w-full bg-black/15" />
              <div className="p-4 md:p-5">
                <div className="h-5 w-3/4  bg-black/15" />
                <div className="mt-2 h-4 w-1/2  bg-black/15" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}