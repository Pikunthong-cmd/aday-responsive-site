"use client";

import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import MagazineHero from "@/components/magazine/MagazineHero";
import MagazineSection from "@/components/magazine/MagazineSection";

const MagazineBookReader = dynamic(
  () => import("@/components/magazine/MagazineBookReader"),
  { ssr: false }
);

type RawPost = any;

type MagazineItem = {
  id: number;
  title: string;
  author: string;
  href: string;
  image: string;
  coverImage: string;
  spreadImage: string;
  mobileImage: string;
};

function pickImage(post: any, type: "vertical" | "featured" | "mobile") {
  if (type === "vertical") {
    return (
      post?.vertical_image?.sizes?.full?.src ||
      post?.vertical_image?.sizes?.medium_large?.src ||
      post?.vertical_image?.sizes?.large?.src ||
      ""
    );
  }

  if (type === "mobile") {
    return (
      post?.mobile_image?.sizes?.full?.src ||
      post?.mobile_image?.sizes?.medium_large?.src ||
      post?.mobile_image?.sizes?.large?.src ||
      ""
    );
  }

  return (
    post?.featured_image?.sizes?.full?.src ||
    post?.featured_image?.sizes?.medium_large?.src ||
    post?.featured_image?.sizes?.large?.src ||
    ""
  );
}

export default function MagazinePageClient({ posts }: { posts: RawPost[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const readerRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo<MagazineItem[]>(() => {
    return (posts || [])
      .map((post) => {
        const coverImage = pickImage(post, "vertical");
        const spreadImage = pickImage(post, "featured");
        const mobileImage = pickImage(post, "mobile");

        return {
          id: post?.id,
          title: post?.title?.rendered || "Untitled",
          author: post?.author_detail?.name || "a team",
          href: post?.link || "#",
          image: coverImage || spreadImage || mobileImage,
          coverImage,
          spreadImage,
          mobileImage,
        };
      })
      .filter((item) => item.id && item.image);
  }, [posts]);

  const heroItem = items[0] || null;

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) || null,
    [items, selectedId]
  );

  const handleSelect = (id: number) => {
    setSelectedId(id);

    setTimeout(() => {
      readerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const recommendItems = items.map((item) => ({
    image: item.image,
    title: item.title,
    author: item.author,
    href: item.href,
    onClick: () => handleSelect(item.id),
  }));

  const latestItems = items.map((item) => ({
    image: item.image,
    title: item.title,
    author: item.author,
    href: item.href,
    onClick: () => handleSelect(item.id),
  }));

  return (
    <>
      {heroItem ? <MagazineHero item={heroItem} /> : null}

      {selectedItem ? (
        <div ref={readerRef} key={selectedItem.id}>
          <MagazineBookReader
            title={selectedItem.title}
            author={selectedItem.author}
            coverImage={selectedItem.coverImage || selectedItem.image}
            pages={[
              selectedItem.coverImage || selectedItem.image,
              selectedItem.mobileImage ||
                selectedItem.spreadImage ||
                selectedItem.image,
              selectedItem.spreadImage ||
                selectedItem.mobileImage ||
                selectedItem.image,
              selectedItem.coverImage || selectedItem.image,
            ].filter(Boolean)}
          />
        </div>
      ) : null}

      <MagazineSection title="แนะนำ" items={recommendItems} />

      <MagazineSection title="LATEST" items={latestItems} />
    </>
  );
}