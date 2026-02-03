import { adayApiClientV2 } from "../lib/client";

export const artistTalkAPI = {
  getCategoriesById: async (id: number, offset : number) => {
    const res = await adayApiClientV2.get(`/posts?page=1&per_page=8&categories=${id}&offset=${offset}`);
    return res.data;
  },

   getAll: async () => {
    const res = await adayApiClientV2.get(`/categories?slug=artist-talk`);
    return res.data;
  },
};
