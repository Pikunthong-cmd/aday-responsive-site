// sections/ArtistTalkSection.tsx

import { artistTalkMock } from "@/app/data/artistTalk.mock";
import ArtistTalkCard from "../ArtistTalkCard";
import ViewMoreButton from "../ViewMoreButton";
import SectionContainer from "../layout/SectionContainer";

export default function ArtistTalkSection() {
  return (
    <SectionContainer className="py-20" padded>
      <div
        className="
          grid gap-12
          grid-cols-1
          lg:grid-cols-2
        "
      >
        {artistTalkMock.map((item) => (
          <ArtistTalkCard key={item.id} {...item} />
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <ViewMoreButton />
      </div>
    </SectionContainer>
  );
}
