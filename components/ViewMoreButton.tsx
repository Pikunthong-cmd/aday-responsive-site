import { IconCaretDown } from "./Icon";

// components/ViewMoreButton.tsx
export default function ViewMoreButton() {
  return (
    <button
      className="
        flex items-center gap-2
        px-6 py-3
        border border-gray-400
        rounded-full
        text-sm
        transition
        cursor-pointer
      "
    >
      View more
      <span className="">
        <IconCaretDown/>
      </span>
    </button>
  );
}
