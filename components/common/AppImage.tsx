"use client";

import Image, { ImageProps } from "next/image";
import { useMemo, useState } from "react";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string;
};

const DEFAULT_FALLBACK = "/images/no-image.png";

export default function AppImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);

  const finalSrc = useMemo(() => {
    if (!src || failed) return fallbackSrc;
    return src;
  }, [src, failed, fallbackSrc]);

  return (
    <Image
      {...rest}
      src={finalSrc}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
