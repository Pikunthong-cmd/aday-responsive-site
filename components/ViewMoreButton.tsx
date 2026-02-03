import { IconCaretDown, IconCaretDownButton } from "./Icon";

type Props = {
  onClick?: () => void;
  loading?: boolean;
};

export default function ViewMoreButton({ onClick, loading }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="
        group
        flex items-center gap-2
        px-6 py-3
        border border-gray-400
        rounded-full
        text-sm
        transition-all duration-300 ease-out
        hover:border-[#FE552C] hover:text-[#FE552C]
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      <span className="transition-opacity duration-200">
        {loading ? "Loading more..." : "View more"}
      </span>

      <span
        className={`
          
          ${loading ? "animate-spin" : "group-hover:translate-y-0"}
        `}
      >
        <IconCaretDownButton />
      </span>
    </button>
  );
}
