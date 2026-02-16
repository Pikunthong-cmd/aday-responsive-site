import ColumnBodyLayout from "@/components/column/ColumnBodyLayout";
import ColumnHeroCover from "@/components/column/ColumnHeroCover";
import DetailsAndShare from "@/components/DetailsAndShare";
import RelatedPosts from "@/components/ui/RelatedPosts";
import { postsAPI } from "@/src/api/posts";

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
  return slug ? `/post/${slug}` : "";
}

function pickImage(p: any) {
  return (
    p?.featured_image?.sizes?.medium_large?.src ||
    p?.featured_image?.sizes?.large?.src ||
    p?.featured_image?.sizes?.medium?.src ||
    p?.thumbnail ||
    ""
  );
}

function pickPlace(p: any) {
  const pc = p?.primary_category?.[0];
  if (pc?.name && pc?.nuxtlink) return { text: pc.name, href: pc.nuxtlink };
  const last = p?.category?.[p?.category?.length - 1];
  if (last?.name && last?.nuxtlink) return { text: last.name, href: last.nuxtlink };
  const first = p?.category?.[0];
  if (first?.name && first?.nuxtlink) return { text: first.name, href: first.nuxtlink };
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
      const title = String(p?.title || p?.title?.rendered || "").trim();
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

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  if (!slug) return <div className="p-6">Invalid slug</div>;

  const res = await postsAPI.getPostBySlug(slug);
  const post = Array.isArray(res) ? res[0] : res;
  if (!post) return <div className="p-6">Post not found</div>;

  const imageUrl = post?.opengraph_image?.url || "";
  const title = post?.title?.rendered || "";
  const content = post?.content?.rendered || "";

  const date = formatDMY(post?.modified);
  const category = post?.data?.keywords || "";
  const author = post?.author_detail?.name || "";
  const photographer = post?.photographer_detail?.name || "-";

  const relatedRaw = Array.isArray(post?.related) ? post.related : [];
  const related = mapRelated(relatedRaw);

  return (
    <main>
      <ColumnHeroCover imageUrl={imageUrl} title={title} />
      <DetailsAndShare
        date={date}
        category={category}
        author={author}
        photographer={photographer}
      />
      <ColumnBodyLayout content={content} />
      <RelatedPosts items={related} />
    </main>
  );
}
