import { MetadataRoute } from "next";
import { postsAPI } from "@/src/api/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://adaymagazine.com"; // ปรับตาม domain จริง

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await postsAPI.getSitemapPosts(100);
    if (Array.isArray(posts)) {
      postEntries = posts.map((post: any) => ({
        url: `${baseUrl}/${post.slug}`,
        lastModified: new Date(post.modified || post.date),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Failed to fetch posts for sitemap", e);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/podcast`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/video`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...postEntries,
  ];
}
