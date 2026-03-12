import Image from "next/image";

type AuthorHeroProps = {
  title: string;
  imageSrc: string;
  role?: string;
  bio?: string;
  totalPosts?: number;
  since?: string;
};

function splitThaiName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return [name, ""];
  return [parts[0], parts.slice(1).join(" ")];
}

export default function AuthorHero({
  title,
  imageSrc,
  role = "WRITER",
  bio = "",
  totalPosts = 0,
  since = "",
}: AuthorHeroProps) {
  const [firstLine, secondLine] = splitThaiName(title);

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_65%,rgba(254,85,44,0.28),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(254,85,44,0.42),transparent_24%),linear-gradient(180deg,#121212_0%,#1B1816_50%,#151515_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_bottom,transparent_0,transparent_31px,rgba(255,255,255,.2)_32px)] [background-size:100%_32px]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 py-7 sm:px-6 sm:py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-8 md:min-h-[300px] md:flex-row md:items-start md:justify-between lg:min-h-[340px]">
          <div className="order-2 max-w-[640px] md:order-1 md:pt-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="block h-[2px] w-10 bg-[#FE552C]" />
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#FE552C]/90 sm:text-xs">
                นักเขียน · {role}
              </p>
            </div>

            <h1 className="leading-none tracking-[-0.03em]">
              <span className="block text-[48px] font-bold text-white sm:text-[60px] md:text-[68px] lg:text-[74px]">
                {firstLine}
              </span>
              {secondLine ? (
                <span className="mt-2 block text-[48px] font-bold text-[#FE552C] sm:text-[60px] md:text-[68px] lg:text-[74px]">
                  {secondLine}
                </span>
              ) : null}
            </h1>

            {bio ? (
              <div className="mt-5 flex items-start gap-2 text-[11px] text-white/75 sm:text-xs">
                <span className="mt-[2px] block h-3 w-[2px] bg-[#FE552C]" />
                <p>{bio}</p>
              </div>
            ) : null}

            <div className="mt-7 flex items-start gap-8 sm:gap-12">
              <div>
                <div className="text-[34px] font-semibold leading-none text-white sm:text-[38px]">
                  {totalPosts}
                </div>
                <div className="mt-2 text-[11px] text-white/65 sm:text-xs">บทความ</div>
              </div>

              <div>
                <div className="text-[34px] font-semibold leading-none text-white sm:text-[38px]">
                  {since}
                </div>
                <div className="mt-2 text-[11px] text-white/65 sm:text-xs">ปีที่เริ่ม</div>
              </div>
            </div>
          </div>

          <div className="order-1 flex justify-start md:order-2 md:justify-end">
            <div className="relative h-[96px] w-[96px] rounded-full border-[3px] border-[#FE552C] p-[4px] shadow-[0_0_0_3px_rgba(254,85,44,0.15)] sm:h-[112px] sm:w-[112px] md:mt-1 md:h-[120px] md:w-[120px] lg:h-[128px] lg:w-[128px]">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-3 hidden select-none text-[120px] font-extrabold uppercase leading-none tracking-[-0.06em] text-white/[0.05] md:block lg:text-[160px]">
          WRITER
        </div>
      </div>
    </section>
  );
}