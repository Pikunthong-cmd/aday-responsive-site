"use client";

import KonsanpokFeatureSection from "@/components/konsanpok/KonsanpokFeatureSection";
import SectionContainer from "@/components/layout/SectionContainer";
import { konsonpokAPI } from "@/src/api/konsonpok";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type SpineItem = {
  id: string;
  number: string;
  image: string;
};

export default function KonsanpokPage() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [q, setQ] = useState("");
  const [dataKonsonpok, setDataKonsonpok] = useState<any>(null);

  useEffect(() => {
      let mounted = true;
  
      (async () => {
        try {
          console.log("Fetching...");
          const [resKonsonpok] = await Promise.all([
            konsonpokAPI.getAll(),
          ]);
  
          console.log("resKonsonpok:", resKonsonpok);
  
          if (!mounted) return;
  
          setDataKonsonpok(resKonsonpok);
        } catch (e) {
          console.error("Failed to load home", e);
        }
      })();
  
      return () => {
        mounted = false;
      };
    }, []);

  const items = useMemo<SpineItem[]>(
    () => [
      { id: "109", number: "109", image: "/images/mock/konsanpok-5.png" },
      { id: "110", number: "110", image: "/images/mock/konsanpok-2.png" },
      { id: "111", number: "111", image: "/images/mock/konsanpok-3.png" },
      { id: "112", number: "112", image: "/images/mock/konsanpok-4.png" },
      { id: "113", number: "113", image: "/images/mock/konsanpok-5.png" },
      { id: "114", number: "114", image: "/images/mock/konsanpok-6.png" },
      { id: "115", number: "115", image: "/images/mock/konsanpok-7.png" },
      { id: "116", number: "116", image: "/images/mock/konsanpok-8.png" },
      { id: "117", number: "117", image: "/images/mock/konsanpok-9.png" },
      { id: "118", number: "118", image: "/images/mock/konsanpok-10.png" },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => it.number.toLowerCase().includes(s));
  }, [items, q]);

  const scrollByCards = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(280, Math.floor(el.clientWidth * 0.8));
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <main className="bg-[#F5F0E6] text-black pb-20">
      {/* Container */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Header row: title + search (desktop) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-[56px] font-black leading-[0.95] tracking-tight sm:text-[72px] lg:text-[88px]">
              คนสันปก
            </h1>
            <p className="mt-4 text-xs leading-5 text-black/70 sm:text-sm sm:leading-6">
              LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. MAECENAS
              EGET LIGULA NISL. NULLA SIT AMET MAURIS TEMPUS, VENENATIS QUAM
              VEL, FEUGIAT MAGNA. CURABITUR ALIQUET MOLESTIE RISUS, IN IACULIS
              DUI PELLENTESQUE VEL.
            </p>
          </div>

          {/* Search (desktop on right, mobile below) */}
          <div className="lg:mt-3">
            <div className="relative w-full lg:w-[420px]">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="SEARCH KONSONPOK"
                className="
                  h-12 w-full rounded-full border border-black/60 bg-transparent
                  pl-5 pr-12 text-xs font-semibold tracking-widest
                  outline-none placeholder:text-black/70
                  focus:border-black
                "
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center"
                aria-label="Search"
              >
                {/* simple magnifier */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10.5 18.5a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M16.5 16.5 21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-10 overflow-visible sm:mt-12">
          <button
            type="button"
            onClick={() => scrollByCards("left")}
            className="
              absolute left-0 top-1/2 z-10 -translate-y-1/2
              grid h-12 w-12 place-items-center rounded-full bg-white
              shadow-[0_6px_20px_rgba(0,0,0,0.12)]
              ring-1 ring-black/10
              hover:scale-[1.02] active:scale-[0.98]
            "
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollByCards("right")}
            className="
              absolute right-0 top-1/2 z-10 -translate-y-1/2
              grid h-12 w-12 place-items-center rounded-full bg-white
              shadow-[0_6px_20px_rgba(0,0,0,0.12)]
              ring-1 ring-black/10
              hover:scale-[1.02] active:scale-[0.98]
            "
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.5 5.5 16 12l-6.5 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Scroller */}
          <div
            ref={scrollerRef}
            className="
    mx-14 overflow-x-auto overflow-y-visible scroll-smooth
    pt-5 pb-8
    [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
  "
          >
            <div className="flex gap-3 sm:gap-4">
              {filtered.map((it) => (
                <Link
                  key={it.id}
                  href={`/magazine/${it.number}`}
                  className="
  group relative shrink-0
  w-[86px] h-[320px]
  sm:w-[92px] sm:h-[360px]
  lg:w-[96px] lg:h-[380px]
  overflow-hidden bg-[#141414] text-white
  ring-1 ring-black/10
  transition-all duration-300 ease-out
  hover:-translate-y-5 
  active:-translate-y-1
  focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60
"
                >
                  {/* number */}
                  <div className="absolute left-0 right-0 top-3 z-10 text-center  font-bold tracking-widest opacity-95">
                    {it.number}
                  </div>

                  <div className="absolute inset-0">
                    <Image
                      src={it.image}
                      alt={`Spine ${it.number}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 86px, (max-width: 1024px) 92px, 96px"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                  <div className="pointer-events-none absolute inset-0 ring-1 ring-white/0 transition duration-300 group-hover:ring-white/15" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom description */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-5 text-black/80 sm:mt-12 sm:text-sm sm:leading-6">
          LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. MAECENAS EGET
          LIGULA NISL. NULLA SIT AMET MAURIS TEMPUS, VENENATIS QUAM VEL, FEUGIAT
          MAGNA. VESTIBULUM UT AUGUE QUIS LECTUS VOLUTPAT EGESTAS. AENEAN
          EUISMOD QUAM QUIS ORCI IACULIS ELEIFEND. ETIAM FEUGIAT, JUSTO ET
          AUCTOR EGESTAS, NULLA URNA RHONCUS ARCU.
        </p>
      </section>
      <SectionContainer padded fullWidth={true}>
        <KonsanpokFeatureSection
          heading={`หญิงสาวเจ้าของเพจ ‘นั่งบ่นในห้องลองเสื้อ’\nผู้ให้เสื้อผ้าบำบัดจิตใจ`}
          blocks={[
            {
              title: "ทำชุดเป็นการพรางตัวเองไม่ถึงกับพรางตัว",
              paragraphs: [
                "ช้อปปิ้งเป็นเหมือนการเติมพลังตอนที่จิตใจเราแกว่ง เราจะได้เลือกของตามใจอยาก เป็นการแลกเปลี่ยนกับเรื่องที่ใจเราคุมไม่ได้ เช่น เจ้านายบ่นหรือแฟนทำอะไรไม่ได้ดั่งใจ เหมือนถ้าของขาดเราก็ซื้อมาเติม และจะยิ่งสนุกตอนได้ลองคอลเลกชันใหม่ๆ เหมือนแต่งตัวตามแมกกาซีน เห็นความเคลื่อนไหวของแบรนด์เราไม่อยากซื้อเพราะมันใส่ไม่ได้บ่อยๆ แต่คนมาถามเยอะว่าซื้อที่ไหน จนเราตัดสินใจเปิดเพจขึ้นมา"
              ],
            },
            {
              title: "ห้องลองเสื้อแบบไหนที่ทำให้คุณอยากเป็นคนๆ หนึ่ง",
              paragraphs: [
                "ห้องกว้างๆ จัดไฟดีๆ ถ้าผนังสีๆ จะยิ่งสนุก พนักงานก็ต้องใจดี ยอมให้ขนเสื้อผ้าเข้าไปลองได้เกิน 4 ตัว",
                "ตอนนี้ก็ต้องพี่สู่ขวัญ เพราะน่าจะได้ลองแบรนด์แพงๆ ได้ (หัวเราะ) อยากไปลอง ปกติถ้าลองเองจะไม่กล้าเข้าไป",
              ],
            },
          ]}
          tiles={[
            {
              type: "color",
              label: "Header",
              bgClass: "bg-[#FBAC41]",
              href: "/konsanpok/feature/a",
            },
            {
              type: "image",
              src: "/images/mock/konsanpok-feature-1.png",
              alt: "feature 4",
              href: "/konsanpok/feature/b",
            },
            {
              type: "color",
              label: "Header",
              bgClass: "bg-[#077B58]",
              href: "/konsanpok/feature/c",
            },
            {
              type: "image",
              src: "/images/mock/konsanpok-feature-2.png",
              alt: "feature 3",
              href: "/konsanpok/feature/d",
            },

            {
              type: "color",
              label: "Header",
              bgClass: "bg-[#685AA4]",
              href: "/konsanpok/feature/e",
            },
            {
              type: "image",
              src: "/images/mock/konsanpok-feature-3.png",
              alt: "feature 2",
              href: "/konsanpok/feature/f",
            },
            {
              type: "color",
              label: "Header",
              bgClass: "bg-[#F15C3A]",
              href: "/konsanpok/feature/g",
            },
            {
              type: "image",
              src: "/images/mock/konsanpok-feature-5.png",
              alt: "feature 1",
              href: "/konsanpok/feature/h",
            },
          ]}
        />
      </SectionContainer>
    </main>
  );
}
