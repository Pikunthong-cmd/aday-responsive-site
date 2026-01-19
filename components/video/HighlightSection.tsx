import SectionContainer from "../layout/SectionContainer";
import VideoCard from "./VideoCard";
import type { VideoItem } from "./types";

type Props = {
  title: string;
  items: VideoItem[];
};

export default function HighlightSection({ title, items }: Props) {
  return (
    <SectionContainer className="pb-10">
      <h2 className="mb-6 h2 font-bold">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <VideoCard key={item.id} item={item} variant="highlight" />
        ))}
      </div>
    </SectionContainer>
  );
}
