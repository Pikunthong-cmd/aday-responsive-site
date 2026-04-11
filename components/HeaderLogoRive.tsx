"use client";

import { useRive } from "@rive-app/react-canvas";

export default function HeaderMenuRive({
  onClick,
}: {
  onClick: () => void;
}) {
  const { RiveComponent, rive } = useRive({
    src: "/icon-aday.riv",
    autoplay: false, 
  });

  const handleEnter = () => {
    if (!rive) return;
    rive.stop();
    rive.play("hover"); 
    console.log(rive?.animationNames);
  };

  const handleLeave = () => {
    if (!rive) return;
    rive.stop();
    rive.play("hover re");
  };
  

  return (
    <button
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