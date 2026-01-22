import { highlightVideosMock } from "@/app/data/video.mock";
import DetailVideoCategory from "@/components/video-category/DetailVideoCategory";
import VideoHeroCategory from "@/components/video-category/VideoHeroCategory";
import HighlightSection from "@/components/video/HighlightSection";

export default function VideoPageCategory() {
  return (
    <main>
      <VideoHeroCategory />
      <DetailVideoCategory />
      <div className="mx-auto">
        <HighlightSection title="" items={highlightVideosMock} />
      </div>
    </main>
  );
}
