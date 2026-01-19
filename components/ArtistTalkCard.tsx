import Image from "next/image";

interface Props {
  image: string;
  title: string;
  subtitle: string;
  highlight?: boolean;
}

export default function ArtistTalkCard({
  image,
  title,
  subtitle,
  highlight = false,
}: Props) {
  return (
    <article
      className="
        group
        flex flex-col
        gap-3
      "
    >
      {/* IMAGE */}
      <div
        className={`
          relative
          overflow-hidden
        `}
      >
        <Image
          src={image}
          alt={title}
          width={600}
          height={800}
          unoptimized
          className="
            w-full
            h-auto
            object-cover
          "
        />
      </div>

      {/* META */}
      <span
        className="
          title
        "
      >
        Artist Talk
      </span>

      {/* TITLE */}
      <h2
        className="
          h3 font-bold
        "
      >
        {title}
      </h2>

      {/* SUBTITLE */}
      <p className="title">{subtitle}</p>
    </article>
  );
}
