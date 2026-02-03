import Image from "next/image";
import { IconTextArttistTalk } from "../Icon";

type HeroCategoryProps = {
  imageSrc: string;
};

export default function HeroCategory({ imageSrc }: HeroCategoryProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="
          relative w-full
          h-[30vh]
          sm:h-[30vh]
          md:h-[45vh]
          lg:h-[45vh]
          xl:h-[40vh]
          max-h-[520px]
        "
      >
        {/* Background image */}
        <Image
          src={imageSrc}
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />

        {/* Center logo / text */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <IconTextArttistTalk />
        </div>
      </div>
    </section>
  );
}
