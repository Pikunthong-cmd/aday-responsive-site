"use client";

import { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import MagazineHero from "@/components/magazine/MagazineHero";
import MagazineSection from "@/components/magazine/MagazineSection";
import { aDayMagazineAPI } from "@/src/api/a-day-magazine";

const MagazineBookReader = dynamic(
  () => import("@/components/magazine/MagazineBookReader"),
  { ssr: false }
);

type RawPost = any;

type MagazineItem = {
  id: number;
  slug: string;
  title: string;
  author: string;
  href: string;
  image: string;
  coverImage: string;
  spreadImage: string;
  mobileImage: string;
  gallery: string[];
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
  const [selectedItem, setSelectedItem] = useState<MagazineItem | null>(null);
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const readerRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo<MagazineItem[]>(() => {
    return (posts || [])
      .map((post) => {
        const coverImage = pickImage(post, "vertical");
        const spreadImage = pickImage(post, "featured");
        const mobileImage = pickImage(post, "mobile");

        return {
          id: post?.id,
          slug: post?.slug || "",
          title: post?.title?.rendered || "Untitled",
          author: post?.author_detail?.name || "a team",
          href: post?.link || "#",
          image: coverImage || spreadImage || mobileImage,
          coverImage,
          spreadImage,
          mobileImage,
          gallery: Array.isArray(post?.image_gallery) ? post.image_gallery : [],
        };
      })
      .filter((item) => item.id && item.slug && item.image);
  }, [posts]);

  const heroItem = items[0] || null;

  const handleSelect = async (item: MagazineItem) => {
    try {
      setLoadingSlug(item.slug);

      const detailRes = await aDayMagazineAPI.getCategoriesBySlug(item.slug);

      const detail = Array.isArray(detailRes) ? detailRes[0] : detailRes;

      const gallery = Array.isArray(detail?.image_gallery)
        ? detail.image_gallery
        : [];

      setSelectedItem({
        ...item,
        gallery,
        coverImage: pickImage(detail, "vertical") || item.coverImage,
        spreadImage: pickImage(detail, "featured") || item.spreadImage,
        mobileImage: pickImage(detail, "mobile") || item.mobileImage,
      });

      setTimeout(() => {
        readerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    } catch (error) {
      console.error("Failed to load magazine detail:", error);
    } finally {
      setLoadingSlug(null);
    }
  };

  const sectionItems = items.map((item) => ({
    image: item.image,
    title: item.title,
    author: item.author,
    href: item.href,
    onClick: () => handleSelect(item),
  }));

  const pages = selectedItem
    ? [
        selectedItem.coverImage || selectedItem.image,
        ...selectedItem.gallery,
      ].filter(Boolean)
    : [];

  return (
    <>
      {heroItem ? <MagazineHero item={heroItem} /> : null}

      {selectedItem ? (
        <div ref={readerRef} key={selectedItem.id}>
          <MagazineBookReader
            title={selectedItem.title}
            author={selectedItem.author}
            coverImage={selectedItem.coverImage || selectedItem.image}
            pages={pages}
          />
        </div>
      ) : null}

      {loadingSlug ? (
        <div className="px-6 py-6 text-center text-sm text-black/50">
          Loading magazine...
        </div>
      ) : null}

      <MagazineSection title="แนะนำ" items={sectionItems} />

      <MagazineSection title="LATEST" items={sectionItems} />
    </>
  );
}