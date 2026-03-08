import HeroCategory from "@/components/layout/HeroCategory";
import SectionContainer from "@/components/layout/SectionContainer";
import PodcastSection from "@/components/podcast/Podcast";
import { categoryFeedAPI } from "@/src/api/category-feed";

const PAGE_SIZE = 8;

function formatCategoryTitle(name: string) {
  const hasThai = /[\u0E00-\u0E7F]/.test(name);
  return hasThai ? name : name.toUpperCase();
}

export default async function PodcastPage() {
  const decodedSlug = "podcast";

  const catRes = await categoryFeedAPI.getCategoryBySlug(decodedSlug);
  const category = Array.isArray(catRes) ? catRes?.[0] : catRes;

  const categoryId: number | null = category?.id ?? null;

  console.log(categoryId);

  const categoryNameRaw: string = category?.name ?? decodedSlug;
  const categoryName: string = formatCategoryTitle(categoryNameRaw);

  const heroImg: string =
    category?.column_image?.sizes?.full?.src ?? "/images/artist-talk/hero.png";

  const initialPosts = categoryId
    ? await categoryFeedAPI.getPostsByCategoryIdAll(categoryId)
    : [];

  const postsArray = Array.isArray(initialPosts)
    ? initialPosts
    : initialPosts
      ? [initialPosts]
      : [];
  const listPosts = postsArray;

  console.log(listPosts);

  return (
    <div className="bg-[#EFEEE7]">
      <HeroCategory imageSrc={heroImg} title={""} />
      <SectionContainer padded>
        <PodcastSection posts={listPosts} title="Highlight" />
        <PodcastSection posts={listPosts} title="Podcast" />
      </SectionContainer>
    </div>
  );
}
