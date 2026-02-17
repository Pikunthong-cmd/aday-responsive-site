"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import VideoHeroCategory from "@/components/video-category/VideoHeroCategory";
import DetailVideoCategory from "@/components/video-category/DetailVideoCategory";
import HighlightSection from "@/components/video/HighlightSection";

import { videoAPI } from "@/src/api/video";
import type { VideoItem } from "@/components/video/types";
import { VideoPageSkeleton } from "@/components/video/VideoSkeleton/VideoSkeleton";

const pickArray = (res: any) => (Array.isArray(res) ? res : res?.items ?? []);

const stripHtml = (html?: string) =>
  (html ?? "").replace(/<[^>]*>/g, "").trim();

const pickPostImage = (post: any) =>
  post?.featured_image?.sizes?.medium_large?.src ||
  post?.featured_image?.sizes?.large?.src ||
  post?.featured_image?.sizes?.medium?.src ||
  post?.opengraph_image?.url ||
  null;

const mapPostToVideoItem = (post: any): VideoItem => {
  const href = post?.nuxtlink || post?.link || "";
  const title = stripHtml(post?.title?.rendered);

  return {
    id: post?.id,
    title,
    href,
    image: pickPostImage(post),
    date: post?.date,
  } as unknown as VideoItem;
};

const Sk = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-black/10 ${className}`} />
);

function VideoHeroCategorySkeleton() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full aspect-square lg:aspect-[1837/732] max-h-[90vh] bg-black/5" />
    </section>
  );
}

function DetailVideoCategorySkeleton() {
  return (
    <div className="px-4 md:px-8 py-8">
      <Sk className="h-10 w-[60%] max-w-[520px]" />
      <div className="mt-4 space-y-2">
        <Sk className="h-4 w-[80%] max-w-[720px]" />
        <Sk className="h-4 w-[72%] max-w-[680px]" />
        <Sk className="h-4 w-[58%] max-w-[520px]" />
      </div>
    </div>
  );
}

export default function VideoPageCategory() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<VideoItem[]>([]);
  const [bgBanner, setBgBanner] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [categoryLink, setCategoryLink] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const slugParam = (params as any)?.slug;
        const slug = Array.isArray(slugParam)
          ? slugParam[slugParam.length - 1]
          : slugParam;

        if (!slug) return;

        const categoryRes = await videoAPI.getCategoryVideoBySlug(slug);
        const category = pickArray(categoryRes)?.[0];

        if (!category?.id) return;

        if (!cancelled) {
          setTitle(stripHtml(category?.name ?? ""));
          setSubTitle(stripHtml(category?.description ?? ""));

          const hero =
            category?.featured_image?.sizes?.full?.src ||
            category?.featured_image?.sizes?.large?.src ||
            category?.featured_image?.sizes?.medium_large?.src ||
            null;

          setBgBanner(hero);

          const rawLink = category?.link ?? "";
          const lastSlug = rawLink.split("/").filter(Boolean).pop();
          const linkVideo = lastSlug
            ? `video/column/${lastSlug}`
            : null;

          setCategoryLink(linkVideo);
        }

        const postsRes = await videoAPI.getCatagoryById(category.id);
        const posts = pickArray(postsRes);
        const mapped = posts.map(mapPostToVideoItem);

        if (!cancelled) {
          setItems(mapped);
        }
      } catch (err) {
        console.error("Video category page error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params]);

  return (
    <main>
      {loading ? (
        <>
          <VideoHeroCategorySkeleton />
          <DetailVideoCategorySkeleton />
        </>
      ) : (
        <>
          <VideoHeroCategory src={bgBanner} />
          <DetailVideoCategory title={title} subTitle={subTitle} />
        </>
      )}

      {loading ? (
        <VideoPageSkeleton sections={1} cardsPerSection={6} />
      ) : (
        <div className="mx-auto">
          {items.length > 0 && (
            <HighlightSection
              title={title}
              items={items}
              linkTitle={categoryLink}
            />
          )}
        </div>
      )}
    </main>
  );
}
