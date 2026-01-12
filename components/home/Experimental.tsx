import Image from "next/image";
import { IconLogoBlack } from "../Icon";

export default function Experimental() {
  return (
    <section className="w-full my-5">
      <Image
        src="/images/experimental-poster.jpg"
        alt="Magazine Type"
        width={1920}
        height={1080}
        className="w-full h-auto"
      />

      <div className="xl:p-40 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div>
            <IconLogoBlack />
          </div>

          {/* Right – CONTENT WRAPPER */}
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
          <video
            className="w-full aspect-video object-cover"
            controls
            poster="/images/poster-video-demo-1.jpg"
          >
            <source src="/videos/video-1.mp4" type="video/mp4" />
          </video>

          <video
            className="w-full aspect-video object-cover"
            controls
            poster="/images/poster-video-demo-2.jpg"
          >
            <source src="/videos/video-2.mp4" type="video/mp4" />
          </video>

          <video
            className="w-full aspect-video object-cover"
            controls
            poster="/images/poster-video-demo-3.jpg"
          >
            <source src="/videos/video-3.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
