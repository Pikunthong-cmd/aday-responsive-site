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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#111111_0%,#171411_36%,#1f1511_58%,#171514_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_78%,rgba(254,85,44,0.38),transparent_20%),radial-gradient(circle_at_82%_16%,rgba(254,85,44,0.34),transparent_18%)]" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-6 py-10 md:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-10 min-h-[300px]">

          {/* LEFT */}
          <div className="max-w-[720px]">

            <div className="mb-4 flex items-center gap-2">
              <span className="h-[2px] w-10 bg-[#FE552C]" />
              <p className="text-[12px] tracking-[0.2em] text-[#FE552C]">
                นักเขียน · {role}
              </p>
            </div>

            <h1 className="leading-[0.9] tracking-[-0.04em]">
              <span className="block text-[48px] font-bold text-white md:text-[64px] lg:text-[72px]">
                {firstLine}
              </span>
              {secondLine && (
                <span className="block text-[48px] font-bold text-[#FE552C] md:text-[64px] lg:text-[72px]">
                  {secondLine}
                </span>
              )}
            </h1>

            {bio && (
              <div className="mt-5 flex max-w-[520px] items-start gap-2 text-[13px] text-white/70">
                <span className="mt-[3px] h-4 w-[3px] bg-[#FE552C]" />
                <p>{bio}</p>
              </div>
            )}

            <div className="mt-8 flex gap-12">
              <div>
                <div className="text-[36px] font-semibold">{totalPosts}</div>
                <div className="text-[12px] text-white/60">บทความ</div>
              </div>

              <div>
                <div className="text-[36px] font-semibold">{since}</div>
                <div className="text-[12px] text-white/60">ปีที่เขียน</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-shrink-0">
            <div className="relative h-[140px] w-[140px] rounded-full border-[4px] border-[#FE552C] p-[4px]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-white/10">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="140px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* BACKGROUND WORD */}
        <div className="pointer-events-none absolute bottom-[-20px] right-[40px] hidden select-none text-[180px] font-extrabold text-white/[0.05] md:block">
          WRITER
        </div>
      </div>
    </section>
  );
}