import SectionContainer from "../layout/SectionContainer";

type Props = {
  title?: string;
  subTitle?: string;
};

export default function DetailVideoCategory({ title, subTitle }: Props) {
  return (
    <SectionContainer padded>
        <h1 className="display-3 font-black py-10">
          {title}
        </h1>

        <p className="title pb-10">
            {subTitle}
        </p>
    </SectionContainer>
  );
}
