"use client";

import KonsanpokFeatureSection from "@/components/konsanpok/KonsanpokFeatureSection";
import SectionContainer from "@/components/layout/SectionContainer";
import { khanpok } from "@/src/api/khanpok-person";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type RawPost = any;

type SpineItem = {
  id: string;
  number: string;
  image: string;
  post: RawPost;
  searchText: string;
};

const pickArray = (res: any): any[] => (Array.isArray(res) ? res : res?.items ?? []);

const pickImage = (p: any) =>
  p?.featured_image?.sizes?.medium_large?.src ||
  p?.featured_image?.sizes?.large?.src ||
  p?.featured_image?.sizes?.medium?.src ||
  p?.opengraph_image?.url ||
  p?.thumbnail ||
  "/images/no-image.png";

const stripHtml = (html?: string) =>
  (html ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const buildSearchText = (p: any) => {
  const title = stripHtml(p?.title?.rendered);
  const content = stripHtml(p?.content?.rendered);
  const description = stripHtml(p?.yoast_head_json?.og_description);
  const number = String(p?.acf?.number ?? p?.id ?? "");
  return [number, title, description, content].join(" ").toLowerCase();
};

const mapPostToSpineItem = (p: any): SpineItem => ({
  id: String(p?.id ?? ""),
  number: String(p?.acf?.number ?? p?.id ?? ""),
  image: pickImage(p),
  post: p,
  searchText: buildSearchText(p),
});

function SpineSkeleton() {
  return (
    <div className="flex gap-3 sm:gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative h-[320px] w-[86px] shrink-0 overflow-hidden bg-black/10 sm:h-[360px] sm:w-[92px] lg:h-[380px] lg:w-[96px]"
        >
          <div className="absolute left-0 right-0 top-3 z-10 mx-auto h-4 w-12 animate-pulse rounded bg-white/40" />
          <div className="h-full w-full animate-pulse bg-[linear-gradient(110deg,rgba(0,0,0,0.06),rgba(0,0,0,0.12),rgba(0,0,0,0.06))] bg-[length:200%_100%] [animation:shine_1.4s_ease-in-out_infinite]" />
        </div>
      ))}
    </div>
  );
}

function IntroSkeleton() {
  return (
    <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
      <div className="mx-auto h-3 w-11/12 animate-pulse rounded bg-black/10" />
      <div className="mx-auto mt-2 h-3 w-full animate-pulse rounded bg-black/10" />
      <div className="mx-auto mt-2 h-3 w-10/12 animate-pulse rounded bg-black/10" />
      <div className="mx-auto mt-2 h-3 w-7/12 animate-pulse rounded bg-black/10" />
    </div>
  );
}

function ContentSkeleton() {
  return (
    <SectionContainer padded fullWidth={true}>
      <section className="mt-14 px-5 sm:mt-16">
        <div className="mx-auto w-full max-w-[920px]">
          <div className="mx-auto h-8 w-64 animate-pulse rounded bg-black/10 sm:h-10 sm:w-80" />

          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            <div className="h-3 w-full animate-pulse rounded bg-black/10" />
            <div className="h-3 w-11/12 animate-pulse rounded bg-black/10" />
            <div className="h-3 w-10/12 animate-pulse rounded bg-black/10" />
            <div className="h-3 w-8/12 animate-pulse rounded bg-black/10" />
          </div>

          <div className="mx-auto mt-10 h-[280px] max-w-[640px] animate-pulse rounded bg-black/10 sm:h-[360px]" />

          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            <div className="h-3 w-full animate-pulse rounded bg-black/10" />
            <div className="h-3 w-full animate-pulse rounded bg-black/10" />
            <div className="h-3 w-10/12 animate-pulse rounded bg-black/10" />
          </div>
        </div>
      </section>
    </SectionContainer>
  );
}

export default function KonsanpokPage() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [items, setItems] = useState<SpineItem[]>([]);
  const [selectedPost, setSelectedPost] = useState<RawPost | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        const catRes = await khanpok.getAll();
        const cat = pickArray(catRes)?.[0];
        const id = Number(cat?.id);

        if (!id) {
          if (!cancelled) setItems([]);
          return;
        }

        const postsRes = await khanpok.getCategoriesById(id);
        const posts: any[] = pickArray(postsRes);
        console.log(posts)

        const mapped: SpineItem[] = posts
          .map(mapPostToSpineItem)
          .filter((x: SpineItem) => Boolean(x.id));

        if (!cancelled) setItems(mapped);
      } catch (e) {
        console.error("KonsanpokPage error:", e);
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => it.searchText.includes(s));
  }, [items, q]);

  const intro = useMemo(() => {
    if (!selectedPost) return "";
    return stripHtml(selectedPost?.yoast_head_json?.og_description) || "";
  }, [selectedPost]);

  const handleSelectPost = (post: RawPost, id: string) => {
    const isSame = String(selectedPost?.id ?? "") === id;

    if (isSame) {
      setSelectedPost(null);
      setContentLoading(false);
      return;
    }

    setContentLoading(true);
    setSelectedPost(post);

    setTimeout(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);

    setTimeout(() => {
      setContentLoading(false);
    }, 450);
  };

  const scrollByCards = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(280, Math.floor(el.clientWidth * 0.8));
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-[#F5F0E6] pb-20 text-black">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-[56px] font-black leading-[0.95] tracking-tight sm:text-[72px] lg:text-[88px]">
              คนสันปก
            </h1>
            <p className="mt-4 text-xs leading-5 text-black/70 sm:text-sm sm:leading-6">
              เลือกสันปกที่ต้องการเพื่อดูรายละเอียดด้านล่าง
            </p>
          </div>

          <div className="lg:mt-3">
            <div className="relative w-full lg:w-[420px]">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="SEARCH KONSONPOK"
                className="h-12 w-full rounded-full border border-black/60 bg-transparent pl-5 pr-12 text-xs font-semibold tracking-widest outline-none placeholder:text-black/70 focus:border-black"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10.5 18.5a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M16.5 16.5 21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-10 overflow-visible sm:mt-12">
          <button
            type="button"
            onClick={() => scrollByCards("left")}
            className="absolute left-0 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] ring-1 ring-black/10 hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollByCards("right")}
            className="absolute right-0 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] ring-1 ring-black/10 hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.5 5.5 16 12l-6.5 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            ref={scrollerRef}
            className="mx-14 overflow-x-auto overflow-y-visible scroll-smooth pt-5 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {loading ? (
              <SpineSkeleton />
            ) : (
              <div className="flex gap-3 sm:gap-4">
                {filtered.map((it) => {
                  const active = String(selectedPost?.id ?? "") === it.id;

                  return (
                    <button
                      key={it.id}
                      type="button"
                      onClick={() => handleSelectPost(it.post, it.id)}
                      className={`group relative h-[320px] w-[86px] shrink-0 overflow-hidden bg-[#141414] text-white ring-1 ring-black/10 transition-all duration-300 ease-out sm:h-[360px] sm:w-[92px] lg:h-[380px] lg:w-[96px] ${
                        active
                          ? "-translate-y-5 ring-2 ring-black"
                          : "hover:-translate-y-5 active:-translate-y-1"
                      }`}
                    >
                      <div className="absolute left-0 right-0 top-3 z-10 text-center font-bold tracking-widest opacity-95">
                        {it.number}
                      </div>

                      <div className="absolute inset-0">
                        <Image
                          src={it.image}
                          alt={`Spine ${it.number}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 86px, (max-width: 1024px) 92px, 96px"
                        />
                      </div>

                      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/0 transition duration-300 group-hover:ring-white/15" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <IntroSkeleton />
        ) : selectedPost && intro ? (
          <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-5 text-black/80 sm:mt-12 sm:text-sm sm:leading-6">
            {intro}
          </p>
        ) : null}

        {!loading && filtered.length === 0 ? (
          <p className="mt-8 text-sm text-black/60">ไม่พบข้อมูลที่ค้นหา</p>
        ) : null}
      </section>

      <div ref={contentRef}>
        {contentLoading ? (
          <ContentSkeleton />
        ) : selectedPost ? (
          <SectionContainer padded fullWidth={true}>
            <KonsanpokFeatureSection html={selectedPost?.content?.rendered || ""} />
          </SectionContainer>
        ) : null}
      </div>

      <style jsx global>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </main>
  );
}