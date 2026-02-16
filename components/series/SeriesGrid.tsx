"use client";

import { useEffect, useMemo, useState } from "react";
import SectionContainer from "../layout/SectionContainer";
import ViewMoreButton from "../ViewMoreButton";
import SeriesCard from "./SeriesCard";
import { seriesAPI } from "@/src/api/series";

type Item = {
  id: number;
  title: string;
  image: string | null;
  href?: string;
};

type Props = {
  items: Item[];
  rootId: number | null;
  loading?: boolean;
  pageSize?: number;
};

const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-black/10 ${className}`} />
);

function SeriesCardSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-md bg-black/5">
      <div className="relative aspect-[3/4] w-full">
        <SkeletonBlock className="absolute inset-0" />
      </div>
      <div className="p-4">
        <SkeletonBlock className="h-4 w-[70%]" />
        <SkeletonBlock className="mt-2 h-3 w-[45%]" />
      </div>
    </div>
  );
}

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

const pickArray = (res: any) => (Array.isArray(res) ? res : res?.items ?? []);

export default function SeriesGrid({
  items: incomingItems,
  rootId,
  loading: initialLoading = false,
  pageSize = 9,
}: Props) {
  const [items, setItems] = useState<Item[]>(incomingItems);
  const [offset, setOffset] = useState(incomingItems.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(incomingItems.length === pageSize);

  // ✅ สำคัญ: sync props -> state (ไม่งั้น fetch แล้วไม่อัปเดต)
  useEffect(() => {
    setItems(incomingItems);
    setOffset(incomingItems.length);
    setHasMore(incomingItems.length === pageSize);
  }, [incomingItems, pageSize]);

  const loadMore = async () => {
    if (!rootId || loading || !hasMore) return;

    console.log("[SeriesGrid] loadMore start", { rootId, offset, pageSize });

    setLoading(true);
    try {
      const res = await seriesAPI.getCategoriesById(rootId, offset, pageSize);
      const posts = pickArray(res);
      const mapped = posts.map(mapPostToItem).filter((x: Item) => x.id && x.title);

      console.log("[SeriesGrid] posts:", posts.length);
      console.log("[SeriesGrid] mapped:", mapped);

      setItems((prev) => [...prev, ...mapped]);
      setOffset((prev) => prev + posts.length);

      if (posts.length < pageSize) setHasMore(false);
    } catch (e) {
      console.error("[SeriesGrid] loadMore error:", e);
    } finally {
      setLoading(false);
      console.log("[SeriesGrid] loadMore end");
    }
  };

  const shownItems = useMemo(() => items, [items]);

  const showInitialSkeleton = initialLoading && shownItems.length === 0;

  return (
    <SectionContainer padded className="mb-20">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {shownItems.map((item) => (
          <SeriesCard key={item.id} item={item} />
        ))}

        
        {showInitialSkeleton &&
          Array.from({ length: 9 }).map((_, i) => <SeriesCardSkeleton key={`init-sk-${i}`} />)}

        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <SeriesCardSkeleton key={`more-sk-${i}`} />
          ))}
      </div>

      {hasMore && (
        <div className="mt-20 flex justify-center">
          <ViewMoreButton onClick={loadMore} loading={loading} />
        </div>
      )}
    </SectionContainer>
  );
}
