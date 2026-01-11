import Image from "next/image";
import ArtistTag from "./ArtistTag";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero.png"
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        {/* Gradient only behind text */}
        <div className="bg-gradient-to-t from-black/90 via-black/40 to-transparent px-6 py-8 md:px-12 md:py-12 max-w-2xl">
          <h2 className="uppercase tracking-widest h2 text-[#FE552C] font-bold mb-2">
            Art & Design
          </h2>

          <h1 className="leading-snug mb-4 h1 font-bold text-white">
            ‘Alie Blackcobra’ ศิลปินผู้เชื่อว่าตัวเองเป็นสัตว์ประหลาดต่างเพศที่รักมนุษย์อย่างเท่าเทียม
          </h1>

          <ArtistTag label="Artist Talk" />
        </div>
      </div>
    </section>
  );
}
