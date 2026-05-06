"use client";

import { useRive } from "@rive-app/react-canvas";

export default function HeaderMenuRive({
  onClick,
  variant = "default",
}: {
  onClick: () => void;
  variant?: "default" | "white";
}) {
  const src = variant === "white" ? "/icon-aday-white.riv" : "/icon-aday.riv";

  const { RiveComponent, rive } = useRive({
    src,
    autoplay: false,
  });

  const handleEnter = () => {
    if (!rive) return;
    rive.stop();
    rive.play("hover");
  };

  const handleLeave = () => {
    if (!rive) return;
    rive.stop();
    rive.play("hover re");
  };

  return (
    <button
      key={src}
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      className="cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="h-[28px] w-[28px]">
        <RiveComponent />
      </div>
    </button>
  );
}