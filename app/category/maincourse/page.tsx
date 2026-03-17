import ArtistTalkSection from "@/components/artist-talk/ArtistTalkSection";
import HeroCategory from "@/components/layout/HeroCategory";
import { categoryFeedAPI } from "@/src/api/category-feed";
import { tagsAPI } from "@/src/api/tags";
import { notFound } from "next/navigation";

const PAGE_SIZE = 8;

type MainCourseTag = {
  id: number;
  name: string;
  slug: string;
  taxonomy?: string;
  link?: string;
  column_image?: {
    sizes?: {
      full?: {
        src?: string;
      };
    };
  };
};

function normalizeMainCourseTag(data: any): MainCourseTag | null {
  if (Array.isArray(data)) {
    return (data[0] as MainCourseTag) ?? null;
  }

  if (data && typeof data === "object") {
    return data as MainCourseTag;
  }

  return null;
}

export default async function MaincoursePage() {
  const apiSlug = "maincourse";

  const catRes = await tagsAPI.getMainCourse();
  const category = normalizeMainCourseTag(catRes);

  if (!category?.id) notFound();

  const categoryId = category.id;
  const categoryName = (category.name || apiSlug).toUpperCase();

  const heroImg =
    category.column_image?.sizes?.full?.src ??
    "/images/artist-talk/hero.png";

  const initialPosts = await categoryFeedAPI.getPostsByCategoryId(
    categoryId,
    0,
    PAGE_SIZE
  );

  return (
    <div className="bg-[#EFEEE7]">
      <HeroCategory imageSrc={heroImg} title={categoryName} />

      <ArtistTalkSection
        artistTalkId={categoryId}
        categoriesRes={initialPosts}
        initialOffset={0}
        pageSize={PAGE_SIZE}
        categoryName={categoryName}
      />
    </div>
  );
}