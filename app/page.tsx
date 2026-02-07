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

import HeroSkeleton from "@/components/home/skeletons/HeroSkeleton";
// (เดี๋ยว component อื่นค่อยทำ skeleton ทีละตัว)

export default function Home() {
  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [banner, setBanner] = useState<BannerVideoResponse | null>(null);
  const [videoCards, setVideoCards] = useState<VideoHomeCard[]>([]);
  const [eventItems, setEventItems] = useState<EventCard[]>([]);

  const [loadingMenu, setLoadingMenu] = useState(true);
  const [loadingHomeSections, setLoadingHomeSections] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingMenu(true);
        const resMenu = (await menuAPI.getAll()) as MenuResponse;
        if (!mounted) return;
        setMenu(resMenu);
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
        setLoadingHomeSections(true);
        const [bannerRes, postsRes] = await Promise.all([
          homeAPI.getAllBanerVideo() as Promise<BannerVideoResponse>,
          postsAPI.getVideoHome() as Promise<VideoHomeApiPost[]>,
        ]);
        if (!mounted) return;
        setBanner(bannerRes);
        setVideoCards(mapRelatedToCards(postsRes, 3));
      } catch (e) {
        console.error("Failed to load home sections", e);
      } finally {
        if (mounted) setLoadingHomeSections(false);
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
        setLoadingEvents(true);
        const tags = (await tagsAPI.getEvent()) as EventTag[];
        const tagId = findEventTagId(tags);
        if (!tagId) return;

        const posts = (await postsAPI.getEventHome(tagId)) as EventHomePost[];
        if (!mounted) return;
        setEventItems(mapRelatedToEventCards(posts, 3));
      } catch (e) {
        console.error("Failed to load event section", e);
      } finally {
        if (mounted) setLoadingEvents(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const slides: HeroSlide[] = useMemo(() => {
    if (!menu?.items?.length) return [];
    const tree = menu.items;
    const flat = flattenMenu(tree);

    const importantItems = flat
      .filter((i) => i.important === true)
      .filter((i) => typeof i.banner_image === "string" && i.banner_image);

    const mapped: (HeroSlide & { order?: number })[] = importantItems.map(
      (item) => ({
        image: item.banner_image as string,
        category: findRootCategoryTitle(item, tree) || "Featured",
        title: item.title,
        tag: item.title,
        order: item.order,
      })
    );

    return sortByOrder(mapped).slice(0, 10);
  }, [menu]);

  return (
    <div className="bg-[#EFEEE7]">
      {/* HERO */}
      {loadingMenu ? (
        <HeroSkeleton />
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

      {/* Experimental / Category / Event เดี๋ยวค่อยทำ skeleton ทีละตัว */}
      <Experimental
        bannerVideo={banner?.bannerVideo}
        linkUrl={banner?.linkUrl}
        videoCards={videoCards}
      />

      <Category items={buildCategoryCardsFromMenu(menu)} />
      <Event items={eventItems} />
    </div>
  );
}

