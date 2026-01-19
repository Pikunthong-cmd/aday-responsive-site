import FeaturedVideosSection from "@/components/video/FeaturedVideosSection";
import VideoHero from "@/components/video/VideoHero";
import { featuredVideosMock, highlightVideosMock } from "../data/video.mock";
import HighlightSection from "@/components/video/HighlightSection";


export default function VideoPage() {
  return (
    <main>
      <VideoHero />

      {/* Content wrapper */}
      <div className="mx-auto">
        <FeaturedVideosSection items={featuredVideosMock} />

        <HighlightSection
          title="Highlight"
          items={highlightVideosMock}
        />
      </div>
    </main>
  );
}
