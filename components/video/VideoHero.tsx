import Image from "next/image";
import SectionContainer from "../layout/SectionContainer";

type VideoHeroProps = {
  image?: string | null;
};

export default function VideoHero({ image }: VideoHeroProps) {
  const src = image || "/images/artist-talk/hero.png";

  return (
    <SectionContainer padded={false} fullWidth>
      <div
        className="
          relative w-full
          aspect-square
          lg:aspect-[1837/732]
          max-h-[90vh]
        "
      >
        <Image
          src={src}
          alt="Video hero"
          fill
          priority
          className="object-cover"
        />
      </div>
    </SectionContainer>
  );
}
