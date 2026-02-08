import { adayApiClientV2 } from "../lib/client";

export const videoAPI = {
  getVideoById: async (id: number) => {
    const res = await adayApiClientV2.get(`/categories?parent=${id}&per_page=100`);
    return res.data;
  },

  getCatagoryById: async (id: number) => {
    const res = await adayApiClientV2.get(`/posts?categories=${id}`);
    return res.data;
  },

  getCategoryVideoBySlug: async (slug: string) => {
    const res = await adayApiClientV2.get(`/categories?slug=${slug}`);
    return res.data;
  },

   getAll: async () => {
    const res = await adayApiClientV2.get(`/categories?slug=video`);
    return res.data;
  },
};
