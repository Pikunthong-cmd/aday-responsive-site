const images = [
  "/images/hero.png",
  "/images/hero.png",
  "/images/hero.png",
  "/images/hero.png",
  "/images/hero.png",
  "/images/hero.png",
  "/images/hero.png",
];

export default function ImageStripSlider() {
  return (
    <section className="w-full my-5">
      <div
        className="
          flex gap-4
          overflow-x-auto
          scroll-smooth
          snap-x snap-mandatory
          px-4 pb-2
          no-scrollbar
        "
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="
              snap-start
              flex-shrink-0
              overflow-hidden

              /* จำนวนภาพต่อจอ */
              w-[85%]          /* mobile: 1 ภาพ */
              sm:w-[60%]       /* tablet เล็ก */
              md:w-[45%]       /* tablet */
              lg:w-[20%]       /* desktop: ~5 ภาพ */
            "
          >
            {/* 16:9 container */}
            <div className="aspect-[16/9] w-full">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
