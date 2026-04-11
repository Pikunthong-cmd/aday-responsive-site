"use client";

import Link from "next/link";
import { IconFaceBook, IconInstagram, IconLine, IconX } from "./Icon";
import SectionContainer from "./layout/SectionContainer";

type DetailsAndShareProps = {
  date?: string;
  category?: string;
  categoryHref?: string;
  author?: string;
  authorHref?: string;
  photographer?: string;
};

export default function DetailsAndShare({
  date = "",
  category = "",
  categoryHref = "",
  author = "",
  authorHref = "",
  photographer = "-",
}: DetailsAndShareProps) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const encodedUrl = encodeURIComponent(currentUrl);

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const shareLine = () => {
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const shareInstagram = async () => {
    window.open("https://www.instagram.com/", "_blank");
  };

  return (
    <SectionContainer padded className="py-4">
      <div className="subtitle border-b border-black/10 pb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-black/70">{date}</div>

          <div className="uppercase tracking-wide text-black/80">
            {categoryHref ? (
              <Link
                href={categoryHref}
                className="cursor-pointer transition-colors duration-300 hover:text-[#FE552C]"
              >
                {category}
              </Link>
            ) : (
              category
            )}
          </div>

          <div className="leading-5 text-black/70">
            <div>
              AUTHOR:{" "}
              {authorHref ? (
                <Link
                  href={authorHref}
                  className="cursor-pointer text-black/80 transition-colors duration-300 hover:text-[#FE552C]"
                >
                  {author}
                </Link>
              ) : (
                <span className="text-black/80">{author}</span>
              )}
            </div>

            {/* <div>
              PHOTOGRAPHER:{" "}
              <span className="text-black/80">{photographer}</span>
            </div> */}
          </div>

          <div className="flex items-center gap-3">
            <span>SHARE:</span>

            <button
              type="button"
              onClick={shareFacebook}
              className="grid cursor-pointer place-items-center transition hover:opacity-70"
            >
              <IconFaceBook width={18} height={18} />
            </button>

            <button
              type="button"
              onClick={shareX}
              className="grid cursor-pointer place-items-center transition hover:opacity-70"
            >
              <IconX width={18} height={18} />
            </button>

            <button
              type="button"
              onClick={shareLine}
              className="grid cursor-pointer place-items-center transition hover:opacity-70"
            >
              <IconLine width={18} height={18} />
            </button>
            <button
              type="button"
              onClick={shareInstagram}
              className="grid cursor-pointer place-items-center transition hover:opacity-70"
            >
              <IconInstagram width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
