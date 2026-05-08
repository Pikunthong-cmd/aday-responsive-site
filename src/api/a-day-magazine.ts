import { adayApiClientV2 } from "../lib/client";

export const aDayMagazineAPI = {
  getCategoriesById: async (id: number) => {
    const res = await adayApiClientV2.get(`/posts?categories=${id}`);
    return res.data;
  },

  getCategoriesBySlug: async (slug: string) => {
    const res = await adayApiClientV2.get(`/posts?slug=${slug}&per_page=10&page=1`);
    return res.data;
  },

  getAll: async () => {
    const res = await adayApiClientV2.get(`/categories?slug=a-day-magazine`);
    return res.data;
  },
};