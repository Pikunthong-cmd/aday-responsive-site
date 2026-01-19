import SectionContainer from "../layout/SectionContainer";
import VideoCard from "./VideoCard";
import type { VideoItem } from "./types";

type Props = {
  items: VideoItem[];
};

export default function FeaturedVideosSection({ items }: Props) {
  return (
    <SectionContainer className="py-8" padded>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          <VideoCard key={items[0].id} item={items[0]} variant="featured" />
      </div>
    </SectionContainer>
  );
}
