"use client";

import { useEffect, useState } from "react";

import VideoHero from "@/components/video/VideoHero";
import HighlightSection from "@/components/video/HighlightSection";

import type { VideoItem } from "@/components/video/types";
import { videoAPI } from "@/src/api/video";
import {
  VideoHeroSkeleton,
  VideoPageSkeleton,
} from "@/components/video/VideoSkeleton/VideoSkeleton";

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

type HighlightSectionData = {
  title: string;
  link: string | null;
  items: VideoItem[];
};

export default function VideoPage() {
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [highlightSections, setHighlightSections] = useState<
    HighlightSectionData[]
  >([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const allRes = await videoAPI.getAll();

        setHeroImage(allRes[0].featured_image?.sizes?.full?.src);
        const allItems = pickArray(allRes);
        if (!allItems.length) return;

        const rootId = allItems[0]?.id;
        if (!rootId) return;

        const catsRes = await videoAPI.getVideoById(rootId);
        const categories = pickArray(catsRes);
        if (!categories.length) return;


        // const firstWithFeatured = categories.find(
        //   (c: any) => c?.featured_image?.sizes?.full?.src
        // );

        // if (!cancelled) {
        //   setHeroImage(
        //     firstWithFeatured?.featured_image?.sizes?.full?.src || null
        //   );
        // }

        const sections: HighlightSectionData[] = await Promise.all(
          categories.map(async (cat: any) => {
            const catId = cat?.id;
            const catName = cat?.name || "Highlight";
            const catLink = cat?.link ?? null;

            if (!catId) {
              return { title: catName, link: catLink, items: [] };
            }

            const postsRes = await videoAPI.getCatagoryById(catId);
            const posts = pickArray(postsRes);
            const items = posts.map(mapPostToVideoItem);

            return { title: catName, link: catLink, items };
          })
        );

        if (!cancelled) {
          setHighlightSections(sections.filter((s) => s.items.length > 0));
        }
      } catch (err) {
        console.error("Video API error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main>
      {/* HERO */}
      {loading && !heroImage ? <VideoHeroSkeleton /> : <VideoHero image={heroImage} />}

      {/* SECTIONS */}
      {loading ? (
        <VideoPageSkeleton sections={3} cardsPerSection={4} />
      ) : (
        <div className="my-20">
          {highlightSections.map((sec) => (
            <HighlightSection
              key={sec.title}
              title={sec.title}
              items={sec.items}
              linkTitle={sec.link}
            />
          ))}
        </div>
      )}
    </main>
  );
}
