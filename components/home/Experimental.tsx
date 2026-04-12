import { IconLogoBlack } from "../Icon";

type VideoHomeItem = {
  id: number;
  title: string;
  href: string;
  video: string;
};

type ExperimentalProps = {
  bannerVideo?: string | null;
  linkUrl?: string | null;
  videoCards?: VideoHomeItem[];
};

export default function Experimental({
  bannerVideo,
  linkUrl,
  videoCards = [],
}: ExperimentalProps) {
  const href = linkUrl || "/";

  return (
    <section className="my-5 w-full">
      {/* HERO VIDEO */}
      {bannerVideo ? (
        <a
          href={href}
          className="block w-full"
          aria-label="Open banner link"
          onMouseEnter={() => {
            const el = document.querySelector(
              "[data-watch-cursor]",
            ) as HTMLElement | null;
            el?.setAttribute("data-active", "true");
          }}
          onMouseLeave={() => {
            const el = document.querySelector(
              "[data-watch-cursor]",
            ) as HTMLElement | null;
            el?.removeAttribute("data-active");
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <video
            className="h-auto w-full cursor-none object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={bannerVideo} type="video/mp4" />
          </video>
        </a>
      ) : (
        <div className="aspect-[16/9] w-full bg-black/10" />
      )}

      <div className="p-20 xl:p-40">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          {/* Left */}
          <div>
            <IconLogoBlack />
          </div>

          {/* Right */}
          <div className="space-y-6">
            <h2 className="h3 text-xl font-extrabold uppercase md:text-2xl">
              a day is an inspiring for all generation
            </h2>

            <div>
              <h3 className="text-lg font-bold uppercase">idea</h3>
              <p className="text-base font-light lowercase md:text-lg">
                creativity that sparks inspiration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold uppercase">somebody</h3>
              <p className="text-base font-light lowercase md:text-lg">
                ordinary people with something extraordinary.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold uppercase">nostalgia</h3>
              <p className="text-base font-light lowercase md:text-lg">
                stories of the past that still linger in the present.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-1 md:grid-cols-3">
          {videoCards.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group relative block w-full overflow-hidden"
              aria-label={item.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="aspect-video w-full bg-black/10">
                <video
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>

              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="rounded-full bg-black/55 p-3 backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
                  <span className="ml-1 block h-0 w-0 border-y-8 border-y-transparent border-l-[14px] border-l-white" />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}