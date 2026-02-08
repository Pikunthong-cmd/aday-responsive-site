"use client";

import Image from "next/image";

type Props = {
  src?: string | null;
};

const FALLBACK = "/images/no-image.png"; 

export default function VideoHeroCategory({ src }: Props) {
  const finalSrc = src || FALLBACK;
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full aspect-square lg:aspect-[1837/732] max-h-[90vh]">
        <Image
          src={finalSrc}
          alt="Video hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
