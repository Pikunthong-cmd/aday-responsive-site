import SectionContainer from "../layout/SectionContainer";

type Props = {
  date: string;
  category: string;
  author: string;
};

export default function ColumnMetaBar({ date, category, author }: Props) {
  return (
    <SectionContainer className="py-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-black/10 pb-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-black/70">
          <span>{date}</span>
          <span className="uppercase tracking-wide font-semibold text-black/80">
            {category}
          </span>
          <span>
            AUTHOR: <span className="font-semibold text-black/80">{author}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-black/70">
          <span className="mr-2">SHARE:</span>
          <button className="h-7 w-7 rounded-full border border-black/15 hover:border-black/30" aria-label="Share to Facebook" />
          <button className="h-7 w-7 rounded-full border border-black/15 hover:border-black/30" aria-label="Share to X" />
          <button className="h-7 w-7 rounded-full border border-black/15 hover:border-black/30" aria-label="Copy link" />
        </div>
      </div>
    </SectionContainer>
  );
}
