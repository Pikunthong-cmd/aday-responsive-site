"use client";

import { useEffect, useState } from "react";
import ArtistTalkCard from "../ArtistTalkCard";
import ViewMoreButton from "../ViewMoreButton";
import SectionContainer from "../layout/SectionContainer";
import { artistTalkAPI } from "@/src/api/artist-talk";
import { categoryFeedAPI } from "@/src/api/category-feed";

type Props = {
  artistTalkId: number | null;
  categoriesRes: any;
  initialOffset: number;
  pageSize?: number;
  categoryName? : any;
};

type CardItem = {
  id: number;
  image: string;
  width?: number;
  height?: number;
  title: string;
  subtitle: string;
  link: string;
  highlight?: boolean;
  categoryName?:string;
};

function stripHtml(input: string) {
  return (input || "").replace(/<[^>]*>/g, "").trim();
}

function normalizeArray(res: any): any[] {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.items)) return res.items;
  return [];
}

function mapToCardItems(raw: any[]): CardItem[] {
  return raw
    .map((it) => {
      const id = it?.id;
      const image = it?.opengraph_image?.url || "";

      const widthRaw = it?.opengraph_image?.width;
      const heightRaw = it?.opengraph_image?.height;

      const width =
        typeof widthRaw === "number" ? widthRaw : parseInt(widthRaw, 10);
      const height =
        typeof heightRaw === "number" ? heightRaw : parseInt(heightRaw, 10);

      const title = stripHtml(it?.title?.rendered || "");
      const subtitle = it?.author_detail?.name || "";
      const link = it?.link || "";

      if (!id || !title || !link) return null;

      return {
        id,
        image,
        width: Number.isFinite(width) ? width : undefined,
        height: Number.isFinite(height) ? height : undefined,
        title,
        subtitle,
        link,
      } as CardItem;
    })
    .filter(Boolean) as CardItem[];
}

function CardSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="w-full bg-neutral-200 animate-pulse aspect-[3/2] lg:aspect-[4/3]" />
          <div className="h-4 w-24 bg-neutral-200 animate-pulse mt-3" />
          <div className="h-6 sm:h-7 w-5/6 bg-neutral-200 animate-pulse" />
          <div className="h-6 sm:h-7 w-3/5 bg-neutral-200 animate-pulse" />
          <div className="h-5 w-40 bg-neutral-200 animate-pulse" />
        </div>
      ))}
    </>
  );
}

export default function ArtistTalkSection({
  artistTalkId,
  categoriesRes,
  initialOffset,
  pageSize = 8,
  categoryName,
}: Props) {
  const [items, setItems] = useState<CardItem[]>([]);
  const [offset, setOffset] = useState(initialOffset);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [idSet, setIdSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const raw = normalizeArray(categoriesRes);
    const mapped = mapToCardItems(raw);

    if (mapped.length) mapped[0] = { ...mapped[0], highlight: true };

    setItems(mapped);
    setOffset(initialOffset + mapped.length);
    setHasMore(mapped.length === pageSize);

    const next = new Set<number>();
    mapped.forEach((x) => next.add(x.id));
    setIdSet(next);
  }, [categoriesRes, initialOffset, pageSize]);

  const loadMore = async () => {
    if (!artistTalkId || loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await categoryFeedAPI.getPostsByCategoryId(
        artistTalkId,
        offset,
        pageSize,
      );

      const raw = normalizeArray(res);
      const mapped = mapToCardItems(raw);

      const unique = mapped.filter((x) => !idSet.has(x.id));

      setItems((prev) => [...prev, ...unique]);
      setOffset((prev) => prev + mapped.length);

      setIdSet((prev) => {
        const next = new Set(prev);
        unique.forEach((x) => next.add(x.id));
        return next;
      });

      if (mapped.length < pageSize) setHasMore(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionContainer className="py-20" padded>
      <div className="grid gap-12 grid-cols-1 lg:grid-cols-2">
        {items.map((item, idx) => (
          <ArtistTalkCard key={item.id} {...item} index={idx} categoryName={categoryName} />
        ))}

        {loading && <CardSkeleton count={pageSize} />}
      </div>

      {hasMore && (
        <div className="mt-20 flex justify-center">
          <ViewMoreButton onClick={loadMore} loading={loading} />
        </div>
      )}
    </SectionContainer>
  );
}
