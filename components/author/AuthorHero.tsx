import Image from "next/image";

type AuthorHeroProps = {
  title: string;
  imageSrc: string;
  role?: string;
  bio?: string;
  totalPosts?: number | string;
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
    <section className="relative overflow-hidden bg-black text-white">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#111111_0%,#171411_36%,#1f1511_58%,#171514_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_78%,rgba(254,85,44,0.38),transparent_20%),radial-gradient(circle_at_82%_16%,rgba(254,85,44,0.34),transparent_18%)]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div className="relative flex min-h-[220px] flex-col gap-6 sm:min-h-[260px] md:min-h-[300px] md:flex-row md:items-center md:justify-between md:gap-10">
          {/* LEFT */}
          <div className="order-2 w-full max-w-[720px] md:order-1">
            <div className="mb-3 flex items-center gap-2 sm:mb-4">
              <span className="h-[2px] w-8 bg-[#FE552C] sm:w-10" />
              <p className="text-[10px] tracking-[0.16em] text-[#FE552C] sm:text-[11px] md:text-[12px] md:tracking-[0.2em]">
                นักเขียน · {role}
              </p>
            </div>

            <h1 className="leading-[1.02] tracking-[-0.04em]">
              <span className="block text-[34px] font-bold text-white sm:text-[42px] md:text-[54px] lg:text-[64px] xl:text-[72px]">
                {firstLine}
              </span>

              {secondLine && (
                <span className="block text-[34px] font-bold text-[#FE552C] sm:text-[42px] md:text-[54px] lg:text-[64px] xl:text-[72px]">
                  {secondLine}
                </span>
              )}
            </h1>

            {bio && (
              <div className="mt-4 flex max-w-[560px] items-start gap-2 text-[12px] leading-relaxed text-white/70 sm:mt-5 sm:text-[13px] md:text-[14px]">
                <span className="mt-[3px] h-4 w-[3px] shrink-0 bg-[#FE552C]" />
                <p>{bio}</p>
              </div>
            )}

            {/* optional stats
            <div className="mt-6 flex gap-8 sm:mt-8 sm:gap-12">
              <div>
                <div className="text-[28px] font-semibold sm:text-[32px] md:text-[36px]">
                  {totalPosts}
                </div>
                <div className="text-[11px] text-white/60 sm:text-[12px]">บทความ</div>
              </div>

              <div>
                <div className="text-[28px] font-semibold sm:text-[32px] md:text-[36px]">
                  {since}
                </div>
                <div className="text-[11px] text-white/60 sm:text-[12px]">ปีที่เขียน</div>
              </div>
            </div>
            */}
          </div>

          {/* RIGHT */}
          <div className="order-1 flex w-full justify-start md:order-2 md:w-auto md:justify-end">
            <div className="relative h-[88px] w-[88px] rounded-full border-[3px] border-[#FE552C] p-[3px] sm:h-[104px] sm:w-[104px] md:h-[124px] md:w-[124px] lg:h-[140px] lg:w-[140px] lg:border-[4px] lg:p-[4px]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-white/10">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 88px, (max-width: 768px) 104px, (max-width: 1024px) 124px, 140px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* BG WORD */}
        <div className="pointer-events-none absolute bottom-[-6px] right-3 select-none text-[64px] font-extrabold leading-none text-white/[0.04] sm:bottom-[-10px] sm:right-5 sm:text-[88px] md:bottom-[-14px] md:right-8 md:text-[120px] lg:bottom-[-20px] lg:right-[40px] lg:text-[180px]">
          WRITER
        </div>
      </div>
    </section>
  );
}