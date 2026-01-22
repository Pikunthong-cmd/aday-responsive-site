import Image from "next/image";
import SectionContainer from "../layout/SectionContainer";
import { IconTextMagazine } from "../Icon";

export default function MagazineHero() {
  return (
    <SectionContainer>
      <div className=" img-hero-mag">
        <IconTextMagazine className="w-full h-auto" />
      </div>
      <div
        className="
          grid gap-6
          grid-cols-1
          lg:grid-cols-2
          bg-black text-white
          
        "
      >
        {/* image */}
        <div className="relative aspect-[4/3] ">
          <Image
            src="/images/mock/mag-hero.png"
            alt="A DAY 251"
            fill
            className="object-cover"
          />
        </div>

        {/* content */}
        <div className="flex flex-col p-6 h-full">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">
              A DAY 251 : NETFLIX
            </h1>
          </div>

          <div className="mt-auto flex items-end gap-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              นักเขียน : A TEAM <br />
              11/10/2022
            </p>

            <button
              className="
        ml-auto
        bg-[#FE552C] text-white
        px-6 py-2
        text-sm font-semibold
      "
            >
              MAGAZINE
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
