import { adayApiClientV2 } from "../lib/client";

export const konsonpokAPI = {
  getDescriptionById: async (id: number) => {
    const res = await adayApiClientV2.get(`/categories/${id}`);
    return res.data;
  },

   getAll: async () => {
    const res = await adayApiClientV2.get(`/posts?per_page=9&page=1&categories=:id&front=true`);
    return res.data;
  },
};
