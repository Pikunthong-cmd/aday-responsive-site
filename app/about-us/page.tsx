import { IconAboutUs } from "@/components/Icon";
import HeroStatic from "@/components/layout/HeroStatic";

export default function AboutUsPage() {
  return (
    <div className="">
      <HeroStatic
        variant="about"
        title="About"
        outlineWord="Us"
        eyebrow="— Est. 2000"
        desktopSrc="/images/bg-other-desktop.png"
        tabletSrc="/images/bg-other-tablet.png"
        mobileSrc="/images/bg-other-mobile.png"
      />

      {/* content */}
      <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 md:px-6 ">
        {/* divider */}
        <div className="mx-auto mb-8 h-[4px] w-20 bg-[#FE552C] mt-20" />

        <div className="mx-auto max-w-3xl text-center mb-10">
          <p className="mt-4 h2">
            <span className="italic text-[#FE552C]">a day</span> is a creativity
            driven publisher.
          </p>
        </div>

        {/* main statement*/}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mt-4 text-sm leading-relaxed text-black/50 md:text-base">
            Founded in 2000, we have been publishing inspiring stories from
            Thailand and all over the world for more than twenty years — and
            we're just getting started.
          </p>
        </div>
      </div>

      {/* stats band */}
      <div className="mt-10 overflow-hidden bg-[#FE552C] text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className="p-8 md:p-10 xl:text-center">
            <div className="text-5xl font-extrabold ">20+</div>
            <div className="mt-2 text-sm opacity-90">Years of Stories</div>
            <div className="mt-6 hidden h-px w-full bg-white/30 md:block" />
          </div>

          <div className="border-t xl:text-center border-white/30 p-8 md:border-t-0 md:border-l md:border-r md:p-10">
            <div className="text-5xl font-extrabold">∞</div>
            <div className="mt-2 text-sm opacity-90">Inspiring Narratives</div>
            <div className="mt-6 hidden h-px w-full bg-white/30 md:block" />
          </div>

          <div className="border-t xl:text-center border-white/30 p-8 md:border-t-0 md:p-10">
            <div className="text-5xl font-extrabold">1</div>
            <div className="mt-2 text-sm opacity-90">Generation Shaped</div>
            <div className="mt-6 hidden h-px w-full bg-white/30 md:block" />
          </div>
        </div>
      </div>

      <section className="mt-12 bg-white">
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <aside className="relative hidden lg:col-span-3 lg:flex xl:flex">
              <div className="flex w-full items-center justify-center py-16">
                <span
                  className="
              select-none
              text-[#FE552C]
              font-extrabold
              tracking-wide
              [writing-mode:vertical-rl]
              rotate-180
              text-4xl
            "
                >
                  Our Story
                </span>
              </div>

              <div className="absolute right-0 top-0 h-full w-px bg-black/10" />
            </aside>

            <div className="px-6 py-12 lg:col-span-8 lg:px-12 lg:py-16 xl:col-span-9">
              <div className="grid grid-cols-[12px_1fr] gap-6 lg:grid-cols-[16px_1fr] lg:gap-8">
                <div className="mt-2 h-20 w-[3px] bg-[#FE552C] lg:h-24" />

                <blockquote className="text-3xl italic leading-snug text-black sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                  “We help shape the way they see and do things in life.”
                </blockquote>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
                <p className="text-sm leading-relaxed text-black/70 sm:text-base">
                  We have been recognized as a{" "}
                  <span className="font-bold text-black">
                    leading media platform for the young generation
                  </span>{" "}
                  because we don&apos;t just report the world — we interpret it,
                  challenge it, and celebrate it through a creative lens that
                  resonates deeply with our audience.
                </p>

                <p className="text-sm leading-relaxed text-black/70 sm:text-base">
                  Though started out as a magazine, now{" "}
                  <span className="font-bold text-black">a day</span> connects
                  with readers via a multitude of tools — website, social media,
                  events, and much more — because great stories deserve to be
                  told everywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
