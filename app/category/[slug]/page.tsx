import ArtistTalkSection from "@/components/artist-talk/ArtistTalkSection";
import HeroCategory from "@/components/layout/HeroCategory";
import { categoryFeedAPI } from "@/src/api/category-feed";

type Params = { slug: string };
const PAGE_SIZE = 8;

function safeDecodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function formatCategoryTitle(name: string) {
  const hasThai = /[\u0E00-\u0E7F]/.test(name);
  return hasThai ? name : name.toUpperCase();
}

export default async function CreativeCategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug: routeSlug } = await params;

  const decodedSlug = safeDecodeSlug(routeSlug);

  const catRes = await categoryFeedAPI.getCategoryBySlug(decodedSlug);
  const category = Array.isArray(catRes) ? catRes?.[0] : catRes;

  const categoryId: number | null = category?.id ?? null;

  const categoryNameRaw: string = category?.name ?? decodedSlug;
  const categoryName: string = formatCategoryTitle(categoryNameRaw);

  const heroImg: string =
    category?.column_image?.sizes?.full?.src ?? "/images/artist-talk/hero.png";

  const initialPosts = categoryId
    ? await categoryFeedAPI.getPostsByCategoryId(categoryId, 0, PAGE_SIZE)
    : null;

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
