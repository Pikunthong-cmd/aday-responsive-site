"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  image: string;
  width?: number;
  height?: number;
  title: string;
  subtitle: string;
  link: string;
  index?: number;
  categoryName?: string;
  fallbackImageSrc?: string;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

export default function ArtistTalkCard({
  image,
  title,
  subtitle,
  link,
  width,
  height,
  index = 0,
  categoryName,
  fallbackImageSrc = "/images/no-image.png",
}: Props) {
  const imgW = typeof width === "number" && width > 0 ? width : 1200;
  const imgH = typeof height === "number" && height > 0 ? height : 800;

  const { ref, inView } = useInView<HTMLElement>();

  const delayStyle = useMemo(
    () => ({ transitionDelay: `${Math.min(index * 80, 400)}ms` }),
    [index],
  );

  const [imgSrc, setImgSrc] = useState<string>(
    image?.trim() ? image : fallbackImageSrc,
  );

  useEffect(() => {
    setImgSrc(image?.trim() ? image : fallbackImageSrc);
  }, [image, fallbackImageSrc]);

  return (
    <article
      ref={ref}
      style={delayStyle}
      className={`
    group
    flex flex-col gap-3
    break-inside-avoid
    mb-12
    transition-all duration-700 ease-out
    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
  `}
    >
      <Link href={link} className="block">
        <Image
          src={imgSrc}
          alt={title}
          width={imgW}
          height={imgH}
          unoptimized
          onError={() => setImgSrc(fallbackImageSrc)}
          className="w-full h-auto"
        />

        <span className="block text-[#FE552C] text-xs sm:text-sm font-medium mt-3">
          {categoryName}
        </span>

        <h2
          className="
            font-bold
            text-base sm:text-lg md:text-xl lg:text-2xl
            leading-snug
            transition-colors
            duration-700
            group-hover:text-[#FE552C]
          "
        >
          {title}
        </h2>

        <p className="text-sm sm:text-base text-neutral-700 font-light">
          {subtitle}
        </p>
      </Link>
    </article>
  );
}
