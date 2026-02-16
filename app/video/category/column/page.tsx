import DetailsAndShare from "@/components/DetailsAndShare";
import RelatedPosts from "@/components/ui/RelatedPosts";

import DetailVideoCategory from "@/components/video-category-column/DetailVideoCategoryColumn";
import VideoHeroCategory from "@/components/video-category-column/VideoHeroCategoryColumn";

export default function VideoPageCategoryColumn() {
  return (
    <main>
        <VideoHeroCategory/>
        <DetailsAndShare/>
        <DetailVideoCategory/>
        <RelatedPosts/>
    </main>
  );
}
