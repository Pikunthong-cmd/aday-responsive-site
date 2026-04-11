"use client";

import Link from "next/link";
import {
  IconFaceBook,
  IconInstagram,
  IconLine,
  IconX,
} from "./Icon";
import SectionContainer from "./layout/SectionContainer";

type PersonProps = {
  label: string;
  name?: string;
  href?: string;
  bio?: string;
  avatar?: string;
};

type DetailsPostProps = {
  tags?: {
    label: string;
    href?: string;
  }[];
  author?: {
    name?: string;
    href?: string;
    bio?: string;
    avatar?: string;
  };
  photographer?: {
    name?: string;
    href?: string;
    bio?: string;
    avatar?: string;
  };
};

function PersonCard({
  label,
  name = "-",
  href = "",
  bio = "",
  avatar = "",
}: PersonProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-4 text-[15px] text-black/45">{label}</div>

      <div className="flex items-start gap-4">
        {avatar ? (
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-black/10 md:h-[72px] md:w-[72px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          {href && name !== "-" ? (
            <Link
              href={href}
              className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-black transition-colors duration-300 hover:text-[#FE552C] md:text-[32px]"
            >
              {name}
            </Link>
          ) : (
            <div className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-black md:text-[32px]">
              {name}
            </div>
          )}

          {bio ? (
            <p className="mt-3 max-w-[520px] text-sm leading-7 text-black/75 md:text-[15px]">
              {bio}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function DetailsPost({
  tags = [],
  author,
  photographer,
}: DetailsPostProps) {
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

  const shareInstagram = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <SectionContainer padded className="py-6 md:py-8">
      <div className="border-t border-black/10 pt-5 md:pt-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[15px] font-medium text-black">Tags:</span>

            {tags.map((tag) => (
              <span
                key={tag.label}
                className="rounded-full bg-[#E9E7E2] px-4 py-2 text-xs text-black/80"
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 self-start md:pl-6">
            <span className="text-[15px] font-medium uppercase tracking-[0.04em] text-black">
              Share :
            </span>

            <button
              type="button"
              onClick={shareFacebook}
              aria-label="Share on Facebook"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full transition hover:bg-black/5 hover:opacity-70"
            >
              <IconFaceBook width={18} height={18} />
            </button>

            <button
              type="button"
              onClick={shareX}
              aria-label="Share on X"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full transition hover:bg-black/5 hover:opacity-70"
            >
              <IconX width={18} height={18} />
            </button>

            <button
              type="button"
              onClick={shareLine}
              aria-label="Share on LINE"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full transition hover:bg-black/5 hover:opacity-70"
            >
              <IconLine width={18} height={18} />
            </button>

            <button
              type="button"
              onClick={shareInstagram}
              aria-label="Open Instagram"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full transition hover:bg-black/5 hover:opacity-70"
            >
              <IconInstagram width={18} height={18} />
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-black/10 bg-white px-5 py-6 md:mt-10 md:px-8 md:py-8">
          <div className="grid grid-cols-1 divide-y divide-black/10 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="pb-6 md:pr-8 md:pb-0">
              <PersonCard
                label="Author"
                name={author?.name || "-"}
                href={author?.href}
                bio={author?.bio}
                avatar={author?.avatar}
              />
            </div>

            <div className="pt-6 md:pl-8 md:pt-0">
              <PersonCard
                label="Photographer"
                name={photographer?.name || "-"}
                href={photographer?.href}
                bio={photographer?.bio}
                avatar={photographer?.avatar || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}