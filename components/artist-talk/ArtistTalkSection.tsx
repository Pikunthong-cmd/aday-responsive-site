"use client";

import { useEffect, useMemo, useState } from "react";
import ViewMoreButton from "../ViewMoreButton";
import SectionContainer from "../layout/SectionContainer";
import { categoryFeedAPI } from "@/src/api/category-feed";
import ArtistTalkCard from "../ArtistTalkCard";

type Props = {
  artistTalkId: number | null;
  categoriesRes: any;
  initialOffset: number;
  pageSize?: number;
  categoryName?: string;
};

type CardItem = {
  id: number;
  image: string;
  width?: number;
  height?: number;
  title: string;
  subtitle: string;
  link: string;
  categoryName?: string;
};

function stripHtml(input: string) {
  return (input || "").replace(/<[^>]*>/g, "").trim();
}

function normalizeArray(res: any): any[] {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.items)) return res.items;
  return [];
}

function mapToCardItems(raw: any[], categoryName?: string): CardItem[] {
  return raw
    .map((it) => {
      const id = it?.id;
      const image = it?.opengraph_image?.url || "";
      const width = Number(it?.opengraph_image?.width);
      const height = Number(it?.opengraph_image?.height);
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
        categoryName,
      };
    })
    .filter(Boolean) as CardItem[];
}

function CardSkeleton({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 mb-12">
          <div className="w-full bg-neutral-200 animate-pulse aspect-[3/2]" />
          <div className="h-4 w-24 bg-neutral-200 animate-pulse mt-3" />
          <div className="h-6 w-5/6 bg-neutral-200 animate-pulse" />
          <div className="h-6 w-3/5 bg-neutral-200 animate-pulse" />
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
    const mapped = mapToCardItems(raw, categoryName);

    setItems(mapped);
    setOffset(initialOffset + mapped.length);
    setHasMore(mapped.length === pageSize);

    const next = new Set<number>();
    mapped.forEach((x) => next.add(x.id));
    setIdSet(next);
  }, [categoriesRes, initialOffset, pageSize, categoryName]);

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
      const mapped = mapToCardItems(raw, categoryName);
      const unique = mapped.filter((x) => !idSet.has(x.id));

      setItems((prev) => [...prev, ...unique]);
      setOffset((prev) => prev + mapped.length);

      setIdSet((prev) => {
        const next = new Set(prev);
        unique.forEach((x) => next.add(x.id));
        return next;
      });

      if (mapped.length < pageSize) setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const { leftItems, rightItems } = useMemo(() => {
    const left: CardItem[] = [];
    const right: CardItem[] = [];

    items.forEach((item, index) => {
      (index % 2 === 0 ? left : right).push(item);
    });

    return { leftItems: left, rightItems: right };
  }, [items]);

  return (
    <SectionContainer className="py-20" padded>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
        <div className="flex flex-col">
          {leftItems.map((item, idx) => (
            <ArtistTalkCard
              key={item.id}
              {...item}
              index={idx * 2}
            />
          ))}
          {loading && <CardSkeleton count={Math.ceil(pageSize / 2)} />}
        </div>

        <div className="flex flex-col">
          {rightItems.map((item, idx) => (
            <ArtistTalkCard
              key={item.id}
              {...item}
              index={idx * 2 + 1}
            />
          ))}
          {loading && <CardSkeleton count={Math.floor(pageSize / 2)} />}
        </div>
      </div>

      {hasMore && (
        <div className="mt-20 flex justify-center">
          <ViewMoreButton onClick={loadMore} loading={loading} />
        </div>
      )}
    </SectionContainer>
  );
}
