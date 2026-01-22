import MagazineBookReader from "@/components/magazine/MagazineBookReader";
import MagazineHero from "@/components/magazine/MagazineHero";
import MagazineSection from "@/components/magazine/MagazineSection";

export default function MagazinePage() {
  return (
    <main className="bg-white py-10">
      <MagazineHero />

      <MagazineBookReader
        title="a day 250 : Apichatpong Weerasethakul"
        author="a team"
        coverImage="/images/Book/a-day_page-0001.jpg"
        pages={[
          "/images/Book/a-day_page-001.png",
          "/images/Book/a-day_page-002.png",
          "/images/Book/a-day_page-003.png",
          "/images/Book/a-day_page-004.png",
          "/images/Book/a-day_page-005.png",
          "/images/Book/a-day_page-006.png",
          "/images/Book/a-day_page-007.png",
          "/images/Book/a-day_page-008.png",
          "/images/Book/a-day_page-009.png",
          "/images/Book/a-day_page-010.png",
        ]}
      />

      <MagazineSection
        title="LATEST"
        items={[
          {
            image: "/images/mock/mag-1.png",
            title: "a day 250 : Apichatpong Weerasethakul",
            author: "a team",
          },
          {
            image: "/images/mock/mag-2.png",
            title: "a day 249 : Global citizen",
            author: "a team",
          },
          {
            image: "/images/mock/mag-3.png",
            title: "a day 248 : Content Creator",
            author: "a team",
          },
        ]}
      />

      <MagazineSection
        title="แนะนำ"
        items={[
          {
            image: "/images/mock/mag-4.png",
            title: "a day 250 : Apichatpong Weerasethakul",
            author: "a team",
          },
          {
            image: "/images/mock/mag-5.png",
            title: "a day 249 : Global citizen",
            author: "a team",
          },
          {
            image: "/images/mock/mag-6.png",
            title: "a day 248 : Content Creator",
            author: "a team",
          },
        ]}
      />
    </main>
  );
}
