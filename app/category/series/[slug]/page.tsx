"use client";

import { useEffect, useState } from "react";
import SeriesHero from "@/components/series/SeriesHero";
import SeriesGrid from "@/components/series/SeriesGrid";
import { seriesAPI } from "@/src/api/series";

type SeriesItem = {
  id: number;
  title: string;
  image: string | null;
  href?: string;
};

const PAGE_SIZE = 8;

const stripHtml = (html?: string) =>
  (html ?? "").replace(/<[^>]*>/g, "").trim();

const pickImage = (post: any) =>
  post?.featured_image?.sizes?.medium_large?.src ||
  post?.featured_image?.sizes?.large?.src ||
  post?.featured_image?.sizes?.medium?.src ||
  post?.opengraph_image?.url ||
  null;

const mapToItem = (post: any): SeriesItem => ({
  id: post?.id,
  title: stripHtml(post?.title?.rendered),
  image: pickImage(post),
  href: post?.link || "",
});

export default function SeriesPage() {
  const [items, setItems] = useState<SeriesItem[]>([]);
  const [rootId, setRootId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        // 1️⃣ ดึง category series
        const catRes = await seriesAPI.getAll();
        const category = Array.isArray(catRes) ? catRes[0] : catRes;

        if (!category?.id) return;

        if (!cancelled) setRootId(category.id);

        // 2️⃣ ดึง posts รอบแรก
        const postsRes = await seriesAPI.getCategoriesById(
          category.id,
          0
        );

        const mapped = (Array.isArray(postsRes) ? postsRes : []).map(mapToItem);

        if (!cancelled) {
          setItems(mapped);
        }
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

  return (
    <main>
      <SeriesHero />

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
