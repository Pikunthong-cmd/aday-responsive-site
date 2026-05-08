"use client";

import { useEffect, useMemo, useState } from "react";

import Category from "@/components/home/Category";
import Event from "@/components/home/Event";
import Experimental from "@/components/home/Experimental";
import Hero, { HeroSlide } from "@/components/home/Hero";
import MagazineType from "@/components/home/MagazineType";

import { menuAPI } from "@/src/api/menu";
import { homeAPI } from "@/src/api/home";
import { tagsAPI } from "@/src/api/tags";
import { postsAPI } from "@/src/api/posts";

import {
  MenuResponse,
  flattenMenu,
  findRootCategoryTitle,
  sortByOrder,
  pickHref,
} from "@/src/lib/menuHelpers";

import { buildCategoryCardsFromMenu } from "@/src/lib/categoryMenuHelpers";
import HeroSkeleton from "@/components/home/skeletons/HeroSkeleton";

import {
  EventCard,
  EventPost,
  EventTag,
  mapPostsToEventCards,
} from "@/src/lib/eventHomeHelpers";

import WatchCursor from "@/components/ui/WatchCursor";

type BannerVideoResponse = {
  key: string;
  bannerVideo: string;
  linkUrl: string;
};

type BannerVideoCard = {
  id: number;
  title: string;
  href: string;
  video: string;
};

export default function Home() {
  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [banner, setBanner] = useState<BannerVideoResponse | null>(null);
  const [videoCards, setVideoCards] = useState<BannerVideoCard[]>([]);
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
        if (mounted) {
          setLoadingMenu(false);
        }
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

        const bannerRes =
          (await homeAPI.getAllBanerVideo()) as BannerVideoResponse[];

        if (!mounted) return;

        const mainBanner =
          bannerRes.find((item) => item.key === "main") ?? null;

        const secondBannerVideos: BannerVideoCard[] = bannerRes
          .filter((item) => item.key === "second")
          .map((item, index) => ({
            id: index + 1,
            title: `video ${index + 1}`,
            href: item.linkUrl,
            video: item.bannerVideo,
          }));

        setBanner(mainBanner);
        setVideoCards(secondBannerVideos);
      } catch (e) {
        console.error("Failed to load home sections", e);
      } finally {
        if (mounted) {
          setLoadingHomeSections(false);
        }
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
        const tagId = tags?.[0]?.id;

        if (!tagId) {
          if (mounted) {
            setEventItems([]);
          }

          return;
        }

        const posts = (await postsAPI.getEventHome(tagId)) as EventPost[];

        if (!mounted) return;

        setEventItems(mapPostsToEventCards(posts, 3));
      } catch (e) {
        console.error("Failed to load event section", e);

        if (mounted) {
          setEventItems([]);
        }
      } finally {
        if (mounted) {
          setLoadingEvents(false);
        }
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
      .filter((item) => item.important === true)
      .filter(
        (item) => typeof item.banner_image === "string" && item.banner_image
      );

    const mapped: (HeroSlide & { order?: number })[] = importantItems.map(
      (item) => ({
        image: item.banner_image as string,
        category: findRootCategoryTitle(item, tree) || "Featured",
        title: item.title || "",
        description: item.description || "",
        link: pickHref(item) || "",
        order: item.order,
      })
    );

    return sortByOrder(mapped).slice(0, 10);
  }, [menu]);

  return (
    <div className="bg-[#EFEEE7]">
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
              title: "No featured items found",
              description: "",
              link: "",
            },
          ]}
        />
      )}

      <MagazineType />
      <WatchCursor />

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