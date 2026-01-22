import Image from "next/image";

type Props = {
  imageUrl: string;
  title: string;
  subtitle: string;
};

export default function ColumnHeroCover({ imageUrl, title, subtitle }: Props) {
  return (
    <section className="w-full">
      <div className="relative w-full h-[260px] sm:h-[420px] lg:h-[520px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="absolute left-0 right-0 bottom-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 lg:pb-10">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="mt-2 text-white/85 text-xs sm:text-sm max-w-2xl leading-5 sm:leading-6">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
