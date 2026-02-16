import { adayApiClientV2 } from "../lib/client";

export const categoryFeedAPI = {
  getCategoryBySlug: async (slug?: string) => {
    
    if (!slug || !slug.trim()) {
      return [];
    }

    const res = await adayApiClientV2.get(
      `/categories?slug=${encodeURIComponent(slug)}`
    );

    return Array.isArray(res.data) ? res.data : [];
  },

  getPostsByCategoryId: async (
    categoryId: number,
    offset: number,
    perPage = 8
  ) => {
    // กัน categoryId พัง
    if (!categoryId) {
      return [];
    }

    const res = await adayApiClientV2.get(
      `/posts?page=1&per_page=${perPage}&categories=${categoryId}&offset=${offset}`
    );

    return Array.isArray(res.data) ? res.data : [];
  },
};
