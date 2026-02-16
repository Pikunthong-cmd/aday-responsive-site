"use client";

import { IconFaceBook, IconLine, IconX } from "./Icon";
import SectionContainer from "./layout/SectionContainer";

type DetailsAndShareProps = {
  date?: string;
  category?: string;
  author?: string;
  photographer?: string;
};

export default function DetailsAndShare({
  date = "",
  category = "",
  author = "",
  photographer = "-",
}: DetailsAndShareProps) {
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const encodedUrl = encodeURIComponent(currentUrl);

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareLine = () => {
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
    } catch {}
  };

  return (
    <SectionContainer padded className="py-4">
      <div className="border-b border-black/10 pb-4 subtitle">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-black/70">{date}</div>

          <div className="uppercase tracking-wide text-black/80">
            {category}
          </div>

          <div className="text-black/70 leading-5">
            <div>
              AUTHOR: <span className="text-black/80">{author}</span>
            </div>
            <div>
              PHOTOGRAPHER:{" "}
              <span className="text-black/80">{photographer}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span>SHARE:</span>

            <button
              type="button"
              onClick={shareFacebook}
              className="grid place-items-center cursor-pointer hover:opacity-70 transition"
            >
              <IconFaceBook width={18} height={18} />
            </button>

            <button
              type="button"
              onClick={shareX}
              className="grid place-items-center cursor-pointer hover:opacity-70 transition"
            >
              <IconX width={18} height={18} />
            </button>

            <button
              type="button"
              onClick={shareLine}
              className="grid place-items-center cursor-pointer hover:opacity-70 transition"
            >
              <IconLine width={18} height={18} />
            </button>

            {/* <button
              type="button"
              onClick={copyLink}
              className="text-xs underline ml-2"
            >
              Copy link
            </button> */}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
