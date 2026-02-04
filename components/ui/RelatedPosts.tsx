"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { IconArrowNext, IconArrowPrev, IconTextRelated } from "./Icon";
import SectionContainer from "./layout/SectionContainer";

export default function RelatedPosts() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(
    () => [
      {
        image: "/images/event-1.png",
        place: "Agenda",
        title: "Design Perspectives x Golden Pin Salon Bangkok 2025",
        subject: "a team",
      },
      {
        image: "/images/event-2.png",
        place: "Agenda",
        title:
          "BITEC BURI เปิดตัวโครงการน้องใหม่ “SAMA Garden” พื้นที่สีเขียวฮีลใจคนเมือง Green Lifestyle Centre ครบจบ",
        subject: "a day",
      },
      {
        image: "/images/event-3.png",
        place: "Founder",
        title:
          "‘House of Mask & Mime’ กลุ่มละครที่ไม่ได้มีแค่หน้ากากและละครใบ้ แต่คือโชว์อะไรก็ได้ที่ไม่พูด!",
        subject: "สมรภูมิ จันทร์นาคา",
      },
      {
        image: "/images/event-2.png",
        place: "Agenda",
        title:
          "BITEC BURI เปิดตัวโครงการน้องใหม่ “SAMA Garden” พื้นที่สีเขียวฮีลใจคนเมือง Green Lifestyle Centre ครบจบ",
        subject: "a day",
      },
      {
        image: "/images/event-1.png",
        place: "Agenda",
        title: "Another related post title example",
        subject: "a team",
      },
      {
        image: "/images/event-2.png",
        place: "Agenda",
        title: "Another related post title example 2",
        subject: "a day",
      },
    ],
    [],
  );

  const scrollByCards = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <SectionContainer padded className="bg-[#EFEEE7]" fullWidth>
      <div className="px-6 py-16 sm:py-20 lg:py-28 xl:py-40 xl:px-40">
        {/* header row */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <IconTextRelated/>
          </div>

          {/* arrows */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollByCards("prev")}
              className="h-10 w-10 grid place-items-center cursor-pointer"
              aria-label="Previous"
            >
              <IconArrowPrev />
            </button>

            <button
              type="button"
              onClick={() => scrollByCards("next")}
              className="h-10 w-10 grid place-items-center cursor-pointer"
              aria-label="Next"
            >
              <IconArrowNext />
            </button>
          </div>
        </div>

        {/* list: mobile 1 / tablet 2 / desktop 3 */}
        <div className="mt-10 sm:mt-14">
          {/* Desktop: horizontal scroll (optional) + hide overflow outside */}
          <div className="overflow-hidden">
            <div
              ref={scrollerRef}
              className="
                flex flex-col
                sm:flex-row
                gap-6
                sm:overflow-x-auto
                sm:scroll-smooth
                sm:[-ms-overflow-style:none]
                sm:[scrollbar-width:none]
                sm:[&::-webkit-scrollbar]:hidden
              "
            >
              {items.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className={[
                    "group cursor-pointer shrink-0",
                    "w-full", // mobile: เห็น 1 ใบ
                    "sm:w-[calc(50%-12px)]", // tablet: 2 ใบ
                    "lg:w-[calc(33.333%-16px)]", // desktop: 3 ใบ
                    index === 1 ? "hidden sm:block" : "", // ใบที่ 2: ซ่อนบน mobile
                    index === 2 ? "hidden lg:block" : "", // ใบที่ 3: ซ่อนบน mobile+tablet
                  ].join(" ")}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[3/4] bg-black/5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>

                  {/* Text */}
                  <div className="mt-4 space-y-2 transition-all duration-300 group-hover:translate-y-[-2px]">
                    <p className="text-xs tracking-widest">{item.place}</p>
                    <p className="text-base font-bold leading-snug text-black line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-xs tracking-widest text-gray-500">
                      เรื่อง {item.subject}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
