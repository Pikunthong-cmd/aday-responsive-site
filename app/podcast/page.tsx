import HeroCategory from "@/components/layout/HeroCategory";
import SectionContainer from "@/components/layout/SectionContainer";
import PodcastSection from "@/components/podcast/Podcast";
import { categoryFeedAPI } from "@/src/api/category-feed";

function formatCategoryTitle(name: string) {
  const hasThai = /[\u0E00-\u0E7F]/.test(name);
  return hasThai ? name : name.toUpperCase();
}

function toArray<T>(data: T | T[] | null | undefined): T[] {
  if (Array.isArray(data)) return data;
  return data ? [data] : [];
}

export default async function PodcastPage() {
  const decodedSlug = "podcast";

  const catRes = await categoryFeedAPI.getCategoryBySlug(decodedSlug);
  const category = Array.isArray(catRes) ? catRes?.[0] : catRes;

  const categoryNameRaw: string = category?.name ?? decodedSlug;
  const categoryName = formatCategoryTitle(categoryNameRaw);

  const heroImg =
    category?.column_image?.sizes?.full?.src ??
    category?.featured_image?.sizes?.full?.src ??
    "/images/artist-talk/hero.png";

  const highlightCategories = toArray(category?.highlight_category);
  const podcastCategories = toArray(category?.sub_category);

  // ยังไม่ต้องเรียก posts ตอนนี้
  // const highlightPosts = await Promise.all(
  //   highlightCategories.map((item: any) =>
  //     categoryFeedAPI.getPostsByCategoryIdAll(item.term_id)
  //   )
  // );

  // const podcastPosts = await Promise.all(
  //   podcastCategories.map((item: any) =>
  //     categoryFeedAPI.getPostsByCategoryIdAll(item.term_id)
  //   )
  // );

  return (
    <div className="bg-[#EFEEE7]">
      <HeroCategory imageSrc={heroImg} title={""} />

      <SectionContainer padded>
        <PodcastSection posts={highlightCategories} title="Highlight" />
        <PodcastSection posts={podcastCategories} title="Podcast" />
      </SectionContainer>
    </div>
  );
}