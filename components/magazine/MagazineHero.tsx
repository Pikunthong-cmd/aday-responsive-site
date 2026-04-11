import Image from "next/image";
import Link from "next/link";
import SectionContainer from "../layout/SectionContainer";
import { IconTextMagazine } from "../Icon";

type Props = {
  item: {
    title: string;
    author: string;
    image: string;
    href: string;
  };
};

export default function MagazineHero({ item }: Props) {
  return (
    <SectionContainer>
      <div className="img-hero-mag">
        <IconTextMagazine className="h-auto w-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 bg-black text-white lg:grid-cols-2">
        <div className="relative aspect-[4/3]">
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        </div>

        <div className="flex h-full flex-col p-6">
          <div>
            <Link
              href={item.href}
              className="text-2xl font-bold leading-tight transition-colors hover:text-[#FE552C] lg:text-4xl"
            >
              {item.title}
            </Link>
          </div>

          <div className="mt-auto flex items-end gap-4">
            <p className="text-sm leading-relaxed text-gray-300">
              นักเขียน : {item.author}
            </p>

            <Link
              href={item.href}
              className="ml-auto bg-[#FE552C] px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              MAGAZINE
            </Link>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}