import DetailsAndShare from "@/components/DetailsAndShare";
import RelatedPosts from "@/components/ui/RelatedPosts";
import DetailVideoCategoryColumn from "@/components/video-category-column/DetailVideoCategoryColumn";
import VideoHeroCategory from "@/components/video-category/VideoHeroCategory";
import { videoAPI } from "@/src/api/video";

const pickArray = (res: any) => (Array.isArray(res) ? res : (res?.items ?? []));

const stripHtml = (html?: string) =>
  (html ?? "").replace(/<[^>]*>/g, "").trim();

function formatDMY(input?: string) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = String(d.getFullYear());
  return `${dd}/${mm}/${yyyy}`;
}

type RelatedItem = {
  id: number;
  title: string;
  image: string;
  postHref: string;
  placeText: string;
  placeHref: string;
  subjectText: string;
  subjectHref: string;
};

function toPostPathFromNuxtlink(nuxtlink?: string) {
  const p = String(nuxtlink || "").trim();
  if (!p) return "";
  const slug = p.replace(/^\/+|\/+$/g, "");
  return slug ? `/video/column/${slug}` : "";
}

function pickImage(p: any) {
  return (
    p?.opengraph_image?.url ||
    p?.featured_image?.sizes?.medium_large?.src ||
    p?.featured_image?.sizes?.large?.src ||
    p?.featured_image?.sizes?.medium?.src ||
    p?.thumbnail ||
    ""
  );
}

function pickTitle(p: any) {
  if (typeof p?.title === "string") return p.title;
  return p?.title?.rendered || "";
}

function pickPlace(p: any) {
  const pc = p?.primary_category?.[0];
  if (pc?.name && pc?.nuxtlink) return { text: pc.name, href: pc.nuxtlink };
  const last = p?.category?.[p?.category?.length - 1];
  if (last?.name && last?.nuxtlink)
    return { text: last.name, href: last.nuxtlink };
  const first = p?.category?.[0];
  if (first?.name && first?.nuxtlink)
    return { text: first.name, href: first.nuxtlink };
  return { text: "", href: "" };
}

function pickSubject(p: any) {
  const a = p?.author_detail;
  return { text: a?.name || "", href: a?.nuxtlink || "" };
}

function mapRelated(items: any[]): RelatedItem[] {
  return (items || [])
    .map((p) => {
      const id = Number(p?.id);
      const title = String(pickTitle(p)).trim();
      const postHref = toPostPathFromNuxtlink(p?.nuxtlink);
      if (!id || !title || !postHref) return null;

      const place = pickPlace(p);
      const subject = pickSubject(p);

      return {
        id,
        title,
        image: pickImage(p),
        postHref,
        placeText: place.text,
        placeHref: place.href,
        subjectText: subject.text,
        subjectHref: subject.href,
      };
    })
    .filter(Boolean) as RelatedItem[];
}

export default async function VideoPageCategoryColumn(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  if (!slug) return <div className="p-6">Invalid slug</div>;

  const res = await videoAPI.getVideoBySlug(slug);
  const video = pickArray(res)?.[0];
  if (!video) return <div className="p-6">Video not found</div>;

  const imageUrl =
    video?.opengraph_image?.url ||
    video?.featured_image?.sizes?.full?.src ||
    video?.featured_image?.sizes?.large?.src ||
    video?.featured_image?.sizes?.medium_large?.src ||
    video?.thumbnail ||
    "";

  const date = formatDMY(video?.date || video?.modified);

  const categoryName =
    stripHtml(video?.primary_category?.[0]?.name) ||
    stripHtml(video?.category?.[video?.category?.length - 1]?.name) ||
    "";

  const author = video?.author_detail?.name || "";
  const photographer = video?.photographer_detail?.name || "-";

  const title = video?.title?.rendered || "";
  const content = video?.content?.rendered || "";

  const relatedRaw = Array.isArray(video?.related) ? video.related : [];
  const related = mapRelated(relatedRaw).filter(
    (x) => x.postHref !== `/video/column/${slug}`,
  );

  return (
    <main>
      <VideoHeroCategory src={imageUrl} />

      <DetailsAndShare
        date={date}
        category={categoryName}
        author={author}
        photographer={photographer}
      />

      <DetailVideoCategoryColumn
        title={title}
        content={content}
        poster={imageUrl}
      />

      <RelatedPosts items={related} />
    </main>
  );
}
