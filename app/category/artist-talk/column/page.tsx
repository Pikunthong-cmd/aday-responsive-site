import { columnMock } from "@/app/data/column.mock";
import ColumnBodyLayout from "@/components/column/ColumnBodyLayout";
import ColumnHeroCover from "@/components/column/ColumnHeroCover";
import ColumnMetaBar from "@/components/column/ColumnMetaBar";
import RelatedPosts from "@/components/RelatedPosts";


export default function ColumnPage() {
  return (
    <main className="bg-white">
      <ColumnHeroCover
        imageUrl={columnMock.hero.imageUrl}
        title={columnMock.hero.title}
        subtitle={columnMock.hero.subtitle}
      />

      <ColumnMetaBar
        date={columnMock.meta.date}
        category={columnMock.meta.category}
        author={columnMock.meta.author}
      />

      <ColumnBodyLayout blocks={columnMock.blocks} />

      <RelatedPosts/>
    </main>
  );
}
