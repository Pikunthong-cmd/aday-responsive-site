export type WpPost = {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
    og_url?: string;
    og_site_name?: string;
    article_published_time?: string;
    article_modified_time?: string;
    og_image?: Array<{
      url: string;
      width?: number;
      height?: number;
      type?: string;
    }>;
    author?: string;
  };
  author_detail?: {
    name?: string;
    url?: string;
  };
  primary_category?: Array<{
    name: string;
    nicename: string;
    nuxtlink?: string;
  }>;
};

export function decodeHtml(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}