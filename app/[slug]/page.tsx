import { Metadata } from "next";
import ColumnBodyLayout from "@/components/column/ColumnBodyLayout";
import ColumnHeroCover from "@/components/column/ColumnHeroCover";
import DetailsAndShare from "@/components/DetailsAndShare";
import DetailsPost from "@/components/DetailsPost";
import RelatedPosts from "@/components/ui/RelatedPosts";
import { postsAPI } from "@/src/api/posts";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const res = await postsAPI.getPostBySlug(slug);
  const post = Array.isArray(res) ? res[0] : res;

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const yoast = post.yoast_head_json;

  return {
    title: yoast?.title || post.title?.rendered,
    description: yoast?.description || "",
    alternates: {
      canonical: yoast?.canonical || `/${slug}`,
    },
    openGraph: {
      title: yoast?.og_title || yoast?.title || post.title?.rendered,
      description: yoast?.og_description || yoast?.description || "",
      url: yoast?.og_url || `/${slug}`,
      siteName: yoast?.og_site_name || "a day magazine",
      type: "article",
      publishedTime: yoast?.article_published_time,
      modifiedTime: yoast?.article_modified_time,
      authors: yoast?.author ? [yoast.author] : [],
      images: yoast?.og_image?.map((img: any) => ({
        url: img.url,
        width: img.width,
        height: img.height,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: yoast?.og_title || yoast?.title || post.title?.rendered,
      description: yoast?.og_description || yoast?.description || "",
      images: yoast?.og_image?.[0]?.url ? [yoast.og_image[0].url] : [],
    },
  };
}

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
  return slug ? `/${slug}` : "";
}

function toAuthorPath(authorSlug?: string, authorId?: number | string) {
  const safeSlug = String(authorSlug || "").trim();
  const safeId = String(authorId || "").trim();
  if (!safeSlug || !safeId) return "";
  return `/author/${safeSlug}?id=${safeId}`;
}

function getAuthorSlugFromNuxtlink(nuxtlink?: string) {
  const p = String(nuxtlink || "").trim();
  if (!p) return "";
  return (
    p
      .replace(/^\/+|\/+$/g, "")
      .split("/")
      .pop() || ""
  );
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

function getPostCategory(post: any) {
  const primary = post?.primary_category?.[0];
  if (primary?.name) {
    return {
      text: primary.name,
      href: primary?.nuxtlink || "",
    };
  }

  const last = post?.category?.[post?.category?.length - 1];
  if (last?.name) {
    return {
      text: last.name,
      href: last?.nuxtlink || "",
    };
  }

  const first = post?.category?.[0];
  if (first?.name) {
    return {
      text: first.name,
      href: first?.nuxtlink || "",
    };
  }

  return {
    text: post?.data?.keywords || "",
    href: "",
  };
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  if (!slug) return <div className="p-6">Invalid slug</div>;

  const res = await postsAPI.getPostBySlug(slug);
  console.log(res);
  const post = Array.isArray(res) ? res[0] : res;
  if (!post) return <div className="p-6">Post not found</div>;

  const imageUrl =
    post?.opengraph_image?.url ||
    post?.featured_image?.sizes?.full?.src ||
    post?.thumbnail ||
    "";

  const title = pickTitle(post);
  const content = post?.content?.rendered || "";

  const date = formatDMY(post?.date || post?.modified);

  const categoryData = getPostCategory(post);
  const category = categoryData.text;
  const categoryHref = categoryData.href;

  const author = post?.author_detail?.name || "";
  const authorId = post?.author_detail?.id || "";
  const authorSlug = getAuthorSlugFromNuxtlink(post?.author_detail?.nuxtlink);
  const authorHref = toAuthorPath(authorSlug, authorId);

  const photographer = post?.photographer_detail?.name || "-";

  const detailTags =
    post?.data?.tags?.map((tag: any) => ({
      label: tag?.name || "",
      href: tag?.slug ? `/tag/${tag.slug}` : "",
    })) || [];

  const detailAuthor = {
    name: post?.author_detail?.name || "-",
    href: authorHref,
    bio:
      post?.yoast_head_json?.schema?.["@graph"]?.find(
        (item: any) => item?.["@type"] === "Person",
      )?.description || "",
    avatar:
      post?.yoast_head_json?.schema?.["@graph"]?.find(
        (item: any) => item?.["@type"] === "Person",
      )?.image?.url || "",
  };

  const detailPhotographer = {
    name: post?.photographer_detail?.name || "-",
    href: "",
    bio: post?.photographer_detail?.description || "",
    avatar: post?.photographer_detail?.avatar || "",
  };

  const relatedRaw =
    (Array.isArray(post?.related) && post.related) ||
    (Array.isArray(post?.related_posts) && post.related_posts) ||
    (Array.isArray(res) && res.length > 1 ? res : []);

  const related = mapRelated(relatedRaw).filter(
    (x) => x.postHref !== `/${slug}`,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: imageUrl,
    datePublished: post?.date,
    dateModified: post?.modified,
    author: [
      {
        "@type": "Person",
        name: author,
        url: `https://adaymagazine.com${authorHref}`,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColumnHeroCover imageUrl={imageUrl} title={title} />
      <DetailsAndShare
        date={date}
        category={category}
        categoryHref={categoryHref}
        author={author}
        authorHref={authorHref}
        photographer={photographer}
      />
      <ColumnBodyLayout content={content} />
      <DetailsPost
        tags={detailTags}
        author={detailAuthor}
        photographer={detailPhotographer}
      />
      <RelatedPosts items={related} />
    </main>
  );
}
