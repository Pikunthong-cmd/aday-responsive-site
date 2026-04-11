import MagazinePageClient from "@/components/magazine/MagazinePageClient";
import { aDayMagazineAPI } from "@/src/api/a-day-magazine";

export default async function MagazinePage() {
  const categoriesRes = await aDayMagazineAPI.getAll();

  const firstCategoryId =
    Array.isArray(categoriesRes) && categoriesRes.length > 0
      ? categoriesRes[0]?.id
      : null;

  let postsRes: any[] = [];

  if (firstCategoryId) {
    postsRes = await aDayMagazineAPI.getCategoriesById(firstCategoryId);
  }

  return (
    <main className="bg-white py-10">
      <MagazinePageClient posts={Array.isArray(postsRes) ? postsRes : []} />
    </main>
  );
}