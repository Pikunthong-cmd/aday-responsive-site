import Image from "next/image";

interface Props {
  image: string;
  title: string;
  author: string;
}

export default function MagazineCard({ image, title, author }: Props) {
  return (
    <article>
      <div className="relative aspect-[4/3] bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-400">Magazine</p>
        <h3 className="font-semibold leading-snug">{title}</h3>
        <p className="text-xs text-gray-500">เรื่อง : {author}</p>
      </div>
    </article>
  );
}
