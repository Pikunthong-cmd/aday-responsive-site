"use client";

import { useEffect, useState } from "react";
import VideoHero from "@/components/video/VideoHero";
import { videoAPI } from "@/src/api/video";
import { VideoHeroSkeleton } from "@/components/video/VideoSkeleton/VideoSkeleton";
import VideoCategoryGrid, { VideoCategoryItem } from "@/components/video/VideoCategoryGrid";


const pickArray = (res: any) => (Array.isArray(res) ? res : res?.items ?? []);

const pickCatImage = (cat: any) =>
  cat?.featured_image?.url ||
  cat?.featured_image?.sizes?.medium_large?.src ||
  cat?.featured_image?.sizes?.large?.src ||
  cat?.featured_image?.sizes?.medium?.src ;

function mapCategories(raw: any[]): VideoCategoryItem[] {
  return (raw || [])
    .map((c) => {
      const id = Number(c?.id);
      const name = String(c?.name || "").trim();
      const slug = String(c?.slug || "").trim();
      if (!id || !name || !slug) return null;
      return { id, name, slug, image: pickCatImage(c) };
    })
    .filter(Boolean) as VideoCategoryItem[];
}

export default function VideoPage() {
  const [loading, setLoading] = useState(true);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [cats, setCats] = useState<VideoCategoryItem[]>([]);


  useEffect(() => {
    let cancelled = false;


    (async () => {
      setLoading(true);
      try {
        const allRes = await videoAPI.getAll();
        const allItems = pickArray(allRes);
        if (!allItems.length) return;

        const hero =
          allItems?.[0]?.featured_image?.sizes?.full?.src ||
          allItems?.[0]?.featured_image?.sizes?.large?.src ||
          null;

        if (!cancelled) setHeroImage(hero);

        const rootId = allItems?.[0]?.id;
        if (!rootId) return;

        const catsRes = await videoAPI.getVideoById(rootId);
        console.log(catsRes)
        const categories = pickArray(catsRes);
        const mapped = mapCategories(categories);

        if (!cancelled) setCats(mapped);
      } catch (err) {
        console.error("Video API error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    console.log(pickCatImage)


    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main>
      {loading && !heroImage ? <VideoHeroSkeleton /> : <VideoHero image={heroImage} />}
      <VideoCategoryGrid items={cats} loading={loading} skeletonCount={6} />
    </main>
  );
}
