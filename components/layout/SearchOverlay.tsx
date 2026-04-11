"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { IconSearch } from "../Icon";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SearchOverlay({ open, onClose }: Props) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) setKeyword("");
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const value = keyword.trim();
    if (!value || isPending) return;

    onClose();

    startTransition(() => {
      router.push(`/search/${encodeURIComponent(value)}`);
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/70">
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close search overlay"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl items-start justify-center px-4 pt-24">
        <div className="w-full rounded-2xl bg-white p-5 shadow-2xl md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black md:text-xl">
              Search
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-black/60 transition hover:text-black"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                autoFocus
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search..."
                disabled={isPending}
                className="h-12 w-full rounded-full border border-black/15 px-5 pr-12 text-base text-black outline-none transition focus:border-[#FE552C] disabled:bg-black/5"
              />
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40">
                <IconSearch width={20} height={20} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="flex h-12 min-w-[118px] items-center justify-center rounded-full bg-[#FE552C] px-6 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Searching
                </span>
              ) : (
                "Search"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}