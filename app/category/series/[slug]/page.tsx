"use client";

import { useEffect, useState } from "react";
import SeriesHero from "@/components/series/SeriesHero";
import SeriesGrid from "@/components/series/SeriesGrid";
import { seriesAPI } from "@/src/api/series";

type Item = {
  id: number;
  title: string;
  image: string | null;
  href?: string;
};

const PAGE_SIZE = 9;

const stripHtml = (html?: string) =>
  (html ?? "").replace(/<[^>]*>/g, "").trim();

const pickImage = (post: any) =>
  post?.featured_image?.sizes?.medium_large?.src ||
  post?.featured_image?.sizes?.large?.src ||
  post?.featured_image?.sizes?.medium?.src ||
  post?.opengraph_image?.url ||
  null;

const mapPostToItem = (post: any): Item => ({
  id: post?.id,
  title: stripHtml(post?.title?.rendered) || "",
  image: pickImage(post),
  href: post?.nuxtlink || post?.link || "",
});

const pickArray = (res: any) =>
  Array.isArray(res) ? res : res?.items ?? [];

export default function SeriesPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [rootId, setRootId] = useState<number | null>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        
        const catRes = await seriesAPI.getAll();
        const categoryData = pickArray(catRes)?.[0];

        if (!categoryData?.id) return;

        if (!cancelled) {
          setRootId(categoryData.id);
          setCategory(categoryData);
        }

        const postsRes = await seriesAPI.getCategoriesById(
          categoryData.id,
          0,
          PAGE_SIZE
        );

        const posts = pickArray(postsRes);
        const mapped = posts
          .map(mapPostToItem)
          .filter((x: Item) => x.id && x.title);

        if (!cancelled) setItems(mapped);
      } catch (err) {
        console.error("Series API error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const heroImg =
    category?.column_image?.sizes?.full?.src ||
    "/images/artist-talk/hero.png";

  const heroTitle =
    category?.name?.toUpperCase?.() || "SERIES";

  return (
    <main>
      <SeriesHero imageSrc={heroImg} title='' />

      <div className="mt-10">
        <SeriesGrid
          items={items}
          rootId={rootId}
          loading={loading}
          pageSize={PAGE_SIZE}
        />
      </div>
    </main>
  );
}
