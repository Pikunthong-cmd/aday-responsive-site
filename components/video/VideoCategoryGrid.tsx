"use client";

import SectionContainer from "@/components/layout/SectionContainer";
import VideoCategoryCard, { VideoCategoryCardSkeleton } from "./VideoCategoryCard";


export type VideoCategoryItem = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
};

type Props = {
  items: VideoCategoryItem[];
  loading?: boolean;
  skeletonCount?: number;
};

export default function VideoCategoryGrid({
  items,
  loading = false,
  skeletonCount = 6,
}: Props) {
  return (
    <SectionContainer className="py-16">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <VideoCategoryCardSkeleton key={i} delayMs={i * 80} />
            ))
          : items.map((item, i) => (
              <VideoCategoryCard key={item.id} item={item} delayMs={i * 80} />
            ))}
      </div>
    </SectionContainer>
  );
}
