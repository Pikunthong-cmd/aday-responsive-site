import Image from "next/image";
import SectionContainer from "../layout/SectionContainer";

export default function VideoHeroCategory() {
  return (
      <SectionContainer padded={false} fullWidth>
        {/* Aspect control */}
        <div
          className="
            relative w-full
            aspect-square
            lg:aspect-[1837/732]
            max-h-[90vh]
          "
        >
          {/* Background image */}
          <Image
            src="/images/artist-talk/hero.png"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
        </div>
      </SectionContainer>
    );
}
