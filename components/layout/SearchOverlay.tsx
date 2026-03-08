"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconSearch } from "../Icon";
import { SearchAPI } from "@/src/api/search";

function useDebouncedValue<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

type UIResult = {
  id: string | number;
  title: string;
  category?: string;
  author?: string;
  cover?: string;
};

function normalizeResults(data: any): UIResult[] {
  const arr = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
  return arr
    .map((it: any, idx: number) => ({
      id: it?.id ?? it?._id ?? `${idx}`,
      title: it?.title ?? it?.name ?? it?.headline ?? "",
      category: it?.category?.name ?? it?.category ?? it?.section ?? "",
      author: it?.author?.name ?? it?.author ?? "",
      cover: it?.cover ?? it?.thumbnail ?? it?.image ?? it?.featured_image ?? "",
    }))
    .filter((x: UIResult) => x.title);
}

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const dq = useDebouncedValue(q, 250);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<UIResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const goSearch = (slug: string) => {
    const s = slug.trim();
    if (!s) return;
    onClose();
    router.push(`/search/${encodeURIComponent(s)}`);
  };

  useEffect(() => {
    if (!open) return;
    setQ("");
    setResults([]);
    setError(null);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const query = dq.trim();
    if (!query) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await SearchAPI.getAll(query);
        if (cancelled) return;
        setResults(normalizeResults(data).slice(0, 8));
      } catch {
        if (cancelled) return;
        setError("ค้นหาไม่สำเร็จ");
        setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dq, open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") goSearch(q);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, q]);

  const show = open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none";

  return (
    <div className={`fixed inset-0 z-[300] transition-opacity duration-200 ${show}`}>
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close search"
        onClick={onClose}
      />

      <div className="relative mx-auto mt-16 w-[92%] max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-2xl">
          <div className="flex items-center justify-between px-5 py-4 sm:px-6">
            <div className="text-sm font-medium text-white/80">Search</div>
            <button
              onClick={onClose}
              className="rounded-full px-3 py-1 text-sm text-white/70 hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="px-5 pb-5 sm:px-6">
            <div className="rounded-2xl bg-white/5 p-2">
              <div className="flex items-center gap-2">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10">
                  <IconSearch width={22} height={22} />
                </div>

                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="พิมพ์คำค้นหา..."
                  className="h-11 w-full bg-transparent px-2 text-base text-white outline-none placeholder:text-white/40"
                />

                <button
                  onClick={() => goSearch(q)}
                  className="h-11 shrink-0 rounded-xl bg-white px-4 text-sm font-semibold text-black"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-white/50">
              <div>{loading ? "กำลังค้นหา..." : error ? error : q.trim() ? "Preview" : "เริ่มพิมพ์เพื่อค้นหา"}</div>
              {q.trim() ? (
                <button onClick={() => goSearch(q)} className="text-white/80 hover:text-white">
                  ดูผลทั้งหมด →
                </button>
              ) : null}
            </div>

            {results.length > 0 ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {results.map((r) => (
                  <button
                    key={String(r.id)}
                    onClick={() => goSearch(q)}
                    className="group flex items-center gap-3 rounded-2xl bg-white/5 p-3 text-left hover:bg-white/10"
                  >
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white/10">
                      {r.cover ? (
                        <Image src={r.cover} alt={r.title} fill className="object-cover" />
                      ) : null}
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white group-hover:text-white">
                        {r.title}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-white/55">
                        {r.category ? <span className="truncate">{r.category}</span> : null}
                        {r.author ? <span className="truncate">• {r.author}</span> : null}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}