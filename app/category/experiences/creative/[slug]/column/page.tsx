import { columnMock } from "@/app/data/column.mock";
import ColumnBodyLayout from "@/components/column/ColumnBodyLayout";
import ColumnHeroCover from "@/components/column/ColumnHeroCover";
import DetailsAndShare from "@/components/DetailsAndShare";
import RelatedPosts from "@/components/ui/RelatedPosts";



export default function ColumnPage() {
  return (
    <main className="bg-white">
      <ColumnHeroCover
        imageUrl={columnMock.hero.imageUrl}
        title={columnMock.hero.title}
        subtitle={columnMock.hero.subtitle}
      />
      <DetailsAndShare/>

      <ColumnBodyLayout blocks={columnMock.blocks} />

      <RelatedPosts/>
    </main>
  );
}
