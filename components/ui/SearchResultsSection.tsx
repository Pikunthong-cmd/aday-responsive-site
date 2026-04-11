"use client";

import { useState } from "react";
import SearchResultsList from "@/components/SearchResultsList";
import SearchResultsSkeleton from "@/components/ui/SearchResultsSkeleton";
import ViewMoreButton from "@/components/ViewMoreButton";
import { SearchAPI } from "@/src/api/search";
import type { SearchUIResult } from "@/app/search/[slug]/page";

type Props = {
  keyword: string;
  initialItems: SearchUIResult[];
  pageSize: number;
};

function getText(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    if (typeof value.rendered === "string") return value.rendered;
    if (typeof value.name === "string") return value.name;
  }
  return "";
}

function pickCover(it: any) {
  return (
    it?.featured_image?.sizes?.medium_large?.src ||
    it?.featured_image?.sizes?.large?.src ||
    it?.featured_image?.sizes?.medium?.src ||
    it?.featured_image?.sizes?.full?.src ||
    it?.featured_image?.src ||
    it?.cover ||
    it?.thumbnail ||
    it?.image ||
    ""
  );
}

function normalizeResults(data: any): SearchUIResult[] {
  const arr = Array.isArray(data)
    ? data
    : Array.isArray(data?.results)
      ? data.results
      : [];

  return arr
    .map((it: any, idx: number) => {
      const categories = Array.isArray(it?.primary_category)
        ? it.primary_category
            .map((cat: any) => ({
              name: getText(cat?.name || cat),
              url: cat?.nuxtlink || "#",
            }))
            .filter((cat: { name: string; url: string }) => cat.name)
        : it?.category
          ? [
              {
                name: getText(it.category),
                url: it?.category?.nuxtlink || "#",
              },
            ]
          : [];

      return {
        id: it?.id ?? `${idx}`,
        title: getText(it?.title ?? it?.headline ?? it?.name),
        author: getText(it?.author_detail?.name ?? it?.author?.name ?? it?.author),
        cover: pickCover(it),
        url: it?.nuxtlink ?? it?.url ?? (it?.slug ? `/${it.slug}` : "#"),
        categories,
      };
    })
    .filter((item: SearchUIResult) => item.title);
}

export default function SearchResultsSection({
  keyword,
  initialItems,
  pageSize,
}: Props) {
  const [items, setItems] = useState<SearchUIResult[]>(initialItems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialItems.length >= pageSize);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const res = await SearchAPI.getAll(keyword, nextPage, pageSize);
      const nextItems = normalizeResults(res);

      setItems((prev) => {
        const merged = [...prev, ...nextItems];
        return merged.filter(
          (item, index, self) =>
            index === self.findIndex((x) => String(x.id) === String(item.id))
        );
      });

      setPage(nextPage);
      setHasMore(nextItems.length >= pageSize);
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pb-16 pt-10 md:pb-20 md:pt-14">
      <SearchResultsList items={items} slug={keyword} />

      {loading && (
        <div className="mx-auto mt-10 max-w-6xl px-4 md:px-6">
          <SearchResultsSkeleton compact />
        </div>
      )}

      {hasMore && (
        <div className="mt-16 flex justify-center">
          <ViewMoreButton onClick={loadMore} loading={loading} />
        </div>
      )}
    </section>
  );
}