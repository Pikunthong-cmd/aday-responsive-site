import Image from "next/image";

import SectionContainer from "../layout/SectionContainer";



export default function ColumnBodyLayout() {

  return (
    <SectionContainer className="py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* LEFT: media column */}
        {/* <div className="space-y-8">
          {blocks
            .filter((b) => b.type === "image")
            .slice(0, 3)
            .map((b, idx) => {
              const img = b as Extract<ColumnBlock, { type: "image" }>;
              return (
                <div key={idx} className="relative w-full aspect-[4/5] bg-black/5">
                  <Image src={img.src} alt={img.alt ?? "image"} fill className="object-cover" />
                </div>
              );
            })}
        </div> */}

        {/* RIGHT: text column */}
        {/* <article className="prose prose-sm max-w-none">
          {blocks.map((b, idx) => {
            if (b.type === "kicker")
              return (
                <p key={idx} className="text-xs tracking-wide uppercase text-black/60 font-semibold">
                  {b.text}
                </p>
              );

            if (b.type === "heading")
              return (
                <h2 key={idx} className="mt-6 text-[18px] lg:text-[20px] font-semibold text-black">
                  {b.text}
                </h2>
              );

            if (b.type === "paragraph")
              return (
                <p key={idx} className="text-[13px] leading-6 text-black/75">
                  {b.text}
                </p>
              );

            if (b.type === "pullquote")
              return (
                <div
                  key={idx}
                  className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-center font-semibold text-black"
                >
                  <div className="text-base leading-7 whitespace-pre-line">{b.left}</div>
                  <div className="text-base leading-7 whitespace-pre-line">{b.right}</div>
                </div>
              );

            if (b.type === "twoImages")
              return (
                <div key={idx} className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative aspect-[16/10] bg-black/5">
                    <Image src={b.leftSrc} alt={b.leftAlt ?? "image"} fill className="object-cover" />
                  </div>
                  <div className="relative aspect-[16/10] bg-black/5">
                    <Image src={b.rightSrc} alt={b.rightAlt ?? "image"} fill className="object-cover" />
                  </div>
                </div>
              );

            // image blocks แสดงฝั่งซ้ายแล้ว ไม่ต้องซ้ำฝั่งขวา
            return null;
          })}
        </article> */}
      </div>
    </SectionContainer>
  );
}
