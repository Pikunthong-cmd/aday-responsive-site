type Props = {
  label: string;
};

export default function ArtistTag({ label }: Props) {
  return (
    <span
      className="
        inline-block
        mt-4
        px-6 py-2
        border border-[#097B55]
        rounded-full
        text-sm
        tracking-wide
        backdrop-blur-sm
        text-[#097B55]
      "
    >
      {label}
    </span>
  );
}
