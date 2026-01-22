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
  date = "21/06/2025",
  category = "ARTIST TALK",
  author = "ปัณฑิต สกุณจุติ",
  photographer = "มรวงทอง",
}: DetailsAndShareProps) {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}
  };

  return (
    <SectionContainer padded className="py-4">
      <div className="border-b border-black/10 pb-4 subtitle">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between ">
          {/* Left: date */}
          <div className="text-black/70">{date}</div>

          {/* Center: category */}
          <div className="uppercase tracking-wide text-black/80">
            {category}
          </div>

          {/* Author/Photographer */}
          <div className="text-black/70 leading-5">
            <div>
              AUTHOR:{" "}
              <span className="text-black/80">{author}</span>
            </div>
            <div>
              PHOTOGRAPHER{" "}
              <span className="text-black/80">
                {photographer}
              </span>
            </div>
          </div>

          {/* Share */}
          <div className="flex items-center gap-3">
            <span>SHARE:</span>

            <button type="button" className="grid place-items-center cursor-pointer">
              <IconFaceBook width={18} height={18}/>
            </button>

            <button
              type="button"
              className="grid place-items-center cursor-pointer"
            >
              <IconX width={18} height={18}/>
            </button>

            <button
              type="button"
              onClick={copyLink}
              className="grid place-items-center cursor-pointer"
            >
              <IconLine width={18} height={18}/>
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
