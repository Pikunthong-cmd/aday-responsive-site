import SectionContainer from "../layout/SectionContainer";
import MagazineCard from "./MagazineCard";


interface Item {
  image: string;
  title: string;
  author: string;
}

interface Props {
  title: string;
  items: Item[];
}

export default function MagazineSection({ title, items }: Props) {
  return (
    <SectionContainer padded className="py-10">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>

      <div
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {items.map((item, index) => (
          <MagazineCard key={index} {...item} />
        ))}
      </div>
    </SectionContainer>
  );
}
