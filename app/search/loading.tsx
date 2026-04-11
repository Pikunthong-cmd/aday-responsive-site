import HeroStatic from "@/components/layout/HeroStatic";
import SearchResultsSkeleton from "@/components/ui/SearchResultsSkeleton";


export default function Loading() {
  return (
    <div className="bg-white">
      <HeroStatic
        variant="search"
        title="Search Results"
        desktopSrc="/images/bg-search-desktop.png"
        tabletSrc="/images/bg-search-tablet.png"
        mobileSrc="/images/bg-search-mobile.png"
      />
      <div className="py-10 md:py-14">
        <SearchResultsSkeleton />
      </div>
    </div>
  );
}