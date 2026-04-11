import Image from "next/image";

type HeroVariant = "about" | "contact" | "privacy" | "search";

type HeroStaticProps = {
  variant: HeroVariant;
  desktopSrc: string;
  tabletSrc: string;
  mobileSrc: string;
  title: string;
  outlineWord?: string;
  eyebrow?: string;
  rightNote?: string;
  rightSubNote?: string;
  heightClassName?: string;
};

export default function HeroStatic({
  variant,
  desktopSrc,
  tabletSrc,
  mobileSrc,
  title,
  outlineWord,
  eyebrow,
  rightNote,
  rightSubNote,
  heightClassName,
}: HeroStaticProps) {
  const height =
    heightClassName ??
    "h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px] xl:h-[360px] max-h-[520px]";

  const orange = "#FE552C";

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className={`relative w-full ${height}`}>
        <Image
          src={mobileSrc}
          alt={title}
          fill
          priority
          className="object-cover md:hidden"
        />
        <Image
          src={tabletSrc}
          alt={title}
          fill
          priority
          className="hidden object-cover md:block lg:hidden"
        />
        <Image
          src={desktopSrc}
          alt={title}
          fill
          priority
          className="hidden object-cover lg:block"
        />

        {variant === "about" ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
            <div>
              {eyebrow ? (
                <div className="mb-3 text-start text-xs tracking-widest text-[#FE552C] md:text-sm">
                  {eyebrow}
                </div>
              ) : null}

              <h1 className="text-5xl font-black tracking-tight md:text-7xl lg:text-8xl">
                <span className="text-[#FE552C]">{title}</span>{" "}
                {outlineWord ? (
                  <span
                    className="text-transparent"
                    style={{ WebkitTextStroke: `2px ${orange}` }}
                  >
                    {outlineWord}
                  </span>
                ) : null}
              </h1>
            </div>
          </div>
        ) : null}

        {variant === "contact" ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-[#FE552C] md:text-7xl lg:text-8xl">
              {title}
            </h1>
          </div>
        ) : null}

        {variant === "search" ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              {title}
            </h1>
          </div>
        ) : null}

        {variant === "privacy" ? (
          <div className="absolute inset-0 z-10 px-6">
            <div className="mx-auto flex h-full w-full max-w-6xl items-center">
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  {eyebrow ? (
                    <div className="mb-3 text-xs tracking-widest text-[#FE552C] md:text-sm">
                      {eyebrow}
                    </div>
                  ) : null}

                  <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-[#FE552C] md:text-6xl lg:text-7xl">
                    {title}
                  </h1>
                </div>

                {rightNote || rightSubNote ? (
                  <div className="max-w-[360px] text-left text-xs leading-relaxed text-white md:text-right">
                    {rightNote ? <div>{rightNote}</div> : null}
                    {rightSubNote ? (
                      <div className="mt-1 text-[#FE552C]">{rightSubNote}</div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
