import { adayApiClientV2 } from "../lib/client";

export const khanpok = {
  getCategoriesById: async (id: number) => {
    const res = await adayApiClientV2.get(`/posts?categories=${id}`);
    return res.data;
  },

   getAll: async () => {
    const res = await adayApiClientV2.get(`/categories?slug=khanpok-person`);
    return res.data;
  },
};
