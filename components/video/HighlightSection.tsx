import Link from "next/link";
import SectionContainer from "../layout/SectionContainer";
import VideoCard from "./VideoCard";
import type { VideoItem } from "./types";

type Props = {
  title: string;
  linkTitle?: string | null;
  items: VideoItem[];
};

export default function HighlightSection({ title, items, linkTitle }: Props) {
  return (
    <SectionContainer className="pb-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <VideoCard key={item.id} item={item} variant="highlight" />
        ))}
      </div>
    </SectionContainer>
  );
}
