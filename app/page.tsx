"use client";

import { useEffect, useMemo, useState } from "react";
import Category from "@/components/home/Category";
import Event from "@/components/home/Event";
import Experimental from "@/components/home/Experimental";
import Hero, { HeroSlide } from "@/components/home/Hero";
import MagazineType from "@/components/home/MagazineType";
import { menuAPI } from "@/src/api/menu";

import {
  MenuResponse,
  flattenMenu,
  findRootCategoryTitle,
  sortByOrder,
} from "@/src/lib/menuHelpers";
import { homeAPI } from "@/src/api/home";
import { postsAPI } from "@/src/api/posts";
import { mapRelatedToCards, VideoHomeApiPost, VideoHomeCard } from "@/src/lib/postsVideoHomeHelpers";
import { buildCategoryCardsFromMenu } from "@/src/lib/categoryMenuHelpers";

type BannerVideoResponse = {
  bannerVideo: string;
  linkUrl: string;
};

export default function Home() {
  const [dataMenu, setDataMenu] = useState<MenuResponse | null>(null);
  const [banner, setBanner] = useState<BannerVideoResponse | null>(null);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [videoCards, setVideoCards] = useState<VideoHomeCard[]>([]);
  const [menu, setMenu] = useState<MenuResponse | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoadingMenu(true);

        const resMenu = (await menuAPI.getAll()) as MenuResponse;

        if (!mounted) return;
        setDataMenu(resMenu);

        console.log("menu items:", resMenu?.items?.length);
      } catch (e) {
        console.error("Failed to load menu", e);
      } finally {
        if (mounted) setLoadingMenu(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = (await homeAPI.getAllBanerVideo()) as BannerVideoResponse;
        if (!mounted) return;

        console.log("banner video:", res);
        setBanner(res);
      } catch (e) {
        console.error("Failed to load banner video", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [bannerRes, postsRes] = await Promise.all([
          homeAPI.getAllBanerVideo() as Promise<BannerVideoResponse>,
          postsAPI.getVideoHome() as Promise<VideoHomeApiPost[]>,
        ]);

        if (!mounted) return;

        setBanner(bannerRes);

        const cards = mapRelatedToCards(postsRes, 3);
        setVideoCards(cards);
      } catch (e) {
        console.error("Failed to load home sections", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = (await menuAPI.getAll()) as MenuResponse;
        if (!mounted) return;
        setMenu(res);
      } catch (e) {
        console.error("Failed to load menu", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const categoryCards = useMemo(() => {
    return buildCategoryCardsFromMenu(menu);
  }, [menu]);

  /**
   * สร้าง slides จาก menu:
   * - ต้อง important === true
   * - ต้องมี banner_image (string)
   * - category = root title (เช่น ART & DESIGN)
   * - tag = title ของ item (เช่น Artist Talk)  -> ปรับได้ภายหลัง
   */
  const slides: HeroSlide[] = useMemo(() => {
    if (!dataMenu?.items?.length) return [];

    const tree = dataMenu.items;
    const flat = flattenMenu(tree);

    const importantItems = flat
      .filter((i) => i.important === true)
      .filter((i) => typeof i.banner_image === "string" && i.banner_image);

    const mapped: (HeroSlide & { order?: number })[] = importantItems.map(
      (item) => {
        const category = findRootCategoryTitle(item, tree);

        return {
          image: item.banner_image as string,
          category: category || "Featured",
          title: item.title, 
          tag: item.title, 
          order: item.order,
        };
      }
    );

    return sortByOrder(mapped).slice(0, 10);
  }, [dataMenu]);

  return (
    <div className="bg-[#EFEEE7]">
      {/* HERO */}
      {loadingMenu ? (
        <div className="h-[70vh] w-full bg-black/10" />
      ) : slides.length > 0 ? (
        <Hero slides={slides} />
      ) : (
        <Hero
          slides={[
            {
              image: "/images/hero.png",
              category: "a day",
              title: "No featured items (important=true) found",
              tag: "Featured",
            },
          ]}
        />
      )}

      <MagazineType />
      <Experimental
        bannerVideo={banner?.bannerVideo}
        linkUrl={banner?.linkUrl}
        videoCards={videoCards}
      />
      <Category items={categoryCards} />
      <Event />
    </div>
  );
}
