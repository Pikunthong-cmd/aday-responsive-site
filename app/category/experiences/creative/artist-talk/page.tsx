import ArtistTalkSection from "@/components/artist-talk/ArtistTalkSection";
import HeroCategory from "@/components/layout/HeroCategory";
import { artistTalkAPI } from "@/src/api/artist-talk";

type ArtistTalkItem = {
  id: number;
  column_image?: { sizes?: { full?: { src?: string } } };
};

export default async function ArtistTalk() {
  const pageSize = 8;
  const initialOffset = 0;

  const res = (await artistTalkAPI.getAll()) as any;
  const items: ArtistTalkItem[] = Array.isArray(res) ? res : (res?.items ?? []);

  const first = items?.[0];
  const heroImg =
    first?.column_image?.sizes?.full?.src ?? "/images/artist-talk/hero.png";

  const artistTalkId = first?.id ?? null;

  const categoriesRes = artistTalkId
    ? await artistTalkAPI.getCategoriesById(artistTalkId, initialOffset)
    : null;

    console.log(categoriesRes)

  return (
    <div className="bg-[#EFEEE7]">
      <HeroCategory imageSrc={heroImg} />

      <ArtistTalkSection
        artistTalkId={artistTalkId}
        categoriesRes={categoriesRes}
        initialOffset={initialOffset}
        pageSize={pageSize}
      />
    </div>
  );
}
