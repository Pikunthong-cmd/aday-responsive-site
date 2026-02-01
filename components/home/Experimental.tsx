import { IconLogoBlack } from "../Icon";
import { Play } from "lucide-react";

type VideoHomeItem = {
  id: number;
  title: string;
  href: string; // ใช้ nuxtlink
  image: string; // image url (remote)
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
    <section className="w-full my-5">
      {/* HERO VIDEO */}
      {bannerVideo ? (
        <a href={href} className="block w-full" aria-label="Open banner link">
          <video
            className="w-full h-auto object-cover"
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
        <div className="w-full aspect-[16/9] bg-black/10" />
      )}

      <div className="xl:p-40 p-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div>
            <IconLogoBlack />
          </div>

          {/* Right */}
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-extrabold uppercase h3">
              a day is an inspiring for all generation
            </h2>

            <div>
              <h3 className="text-lg font-bold uppercase">idea</h3>
              <p className="text-base md:text-lg font-light lowercase">
                creativity that sparks inspiration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold uppercase">somebody</h3>
              <p className="text-base md:text-lg font-light lowercase">
                ordinary people with something extraordinary.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold uppercase">nostalgia</h3>
              <p className="text-base md:text-lg font-light lowercase">
                stories of the past that still linger in the present.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-1">
          {videoCards.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="group relative block w-full overflow-hidden"
              aria-label={item.title}
            >
              <div className="aspect-video w-full bg-black/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="rounded-full bg-black/55 backdrop-blur-sm p-3 transition-transform duration-200 group-hover:scale-105">
                  <span className="block w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-white ml-1" />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                {/* <div className="text-white text-sm font-semibold line-clamp-2">
                  {item.title}
                </div> */}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
