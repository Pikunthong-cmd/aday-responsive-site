import Image from "next/image";

type HeroCategoryProps = {
  imageSrc: string;
  title: string;
};

export default function HeroCategory({ imageSrc, title }: HeroCategoryProps) {
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
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <h1
            className="
              text-white
              font-extrabold
              text-center
              tracking-wide
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
            "
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
