"use client";

import { useEffect, useMemo, useState } from "react";

import Category from "@/components/home/Category";
import Event from "@/components/home/Event";
import Experimental from "@/components/home/Experimental";
import Hero, { HeroSlide } from "@/components/home/Hero";
import MagazineType from "@/components/home/MagazineType";

import { menuAPI } from "@/src/api/menu";
import { homeAPI } from "@/src/api/home";
import { postsAPI } from "@/src/api/posts";
import { tagsAPI } from "@/src/api/tags";

import {
  MenuResponse,
  flattenMenu,
  findRootCategoryTitle,
  sortByOrder,
} from "@/src/lib/menuHelpers";

import {
  mapRelatedToCards,
  VideoHomeApiPost,
  VideoHomeCard,
} from "@/src/lib/postsVideoHomeHelpers";

import { buildCategoryCardsFromMenu } from "@/src/lib/categoryMenuHelpers";

import {
  EventCard,
  EventHomePost,
  EventTag,
  findEventTagId,
  mapRelatedToEventCards,
} from "@/src/lib/eventHomeHelpers";

type BannerVideoResponse = {
  bannerVideo: string;
  linkUrl: string;
};

export default function Home() {
  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [banner, setBanner] = useState<BannerVideoResponse | null>(null);

  const [videoCards, setVideoCards] = useState<VideoHomeCard[]>([]);
  const [eventItems, setEventItems] = useState<EventCard[]>([]);

  const [loadingMenu, setLoadingMenu] = useState(true);

  // Load menu (used by Hero + Category)
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoadingMenu(true);
        const resMenu = (await menuAPI.getAll()) as MenuResponse;

        if (!mounted) return;
        setMenu(resMenu);

        console.log("menu items:", resMenu?.items?.length ?? 0);
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

  // Load banner video + video home cards
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [bannerRes, postsRes] = await Promise.all([
          homeAPI.getAllBanerVideo() as Promise<BannerVideoResponse>,
          postsAPI.getVideoHome() as Promise<VideoHomeApiPost[]>,
        ]);

        if (!mounted) return;

        console.log("banner video:", bannerRes);
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

  // Load event cards
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const tags = (await tagsAPI.getEvent()) as EventTag[];
        const tagId = findEventTagId(tags);

        if (!tagId) {
          console.warn("Event tag not found");
          return;
        }

        const posts = (await postsAPI.getEventHome(tagId)) as EventHomePost[];
        const cards = mapRelatedToEventCards(posts, 3);

        if (!mounted) return;
        setEventItems(cards);
      } catch (e) {
        console.error("Failed to load event section", e);
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
   * Build slides from menu:
   * - important === true
   * - has banner_image
   * - category = root title (e.g. ART & DESIGN)
   * - tag = item.title (adjust later)
   */
  const slides: HeroSlide[] = useMemo(() => {
    if (!menu?.items?.length) return [];

    const tree = menu.items;
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
  }, [menu]);

  const loadingHero = loadingMenu;

  return (
    <div className="bg-[#EFEEE7]">
      {/* HERO */}
      {loadingHero ? (
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
      <Event items={eventItems} />
    </div>
  );
}
