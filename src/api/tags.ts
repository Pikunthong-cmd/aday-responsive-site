import { adayApiClientV2 } from "../lib/client";


export const tagsAPI = {
  getAll: async () => {
    const res = await adayApiClientV2.get("/tags");
    return res.data;
  },

  getEvent: async () => {
    const res = await adayApiClientV2.get("/categories?slug=activities");
    return res.data;
  },

  getPostsByTagId: async (
    categoryId: number,
    offset: number,
    perPage = 8
  ) => {
    const res = await adayApiClientV2.get(`/posts?per_page=${perPage}&page=1&id=${categoryId}&offset=${offset}`);
    console.log('res >>>>>>',res.data)
   return Array.isArray(res.data) ? res.data : [];
  },

  getMainCourse: async () => {
    const res = await adayApiClientV2.get("/tags?slug=maincourse");
    return res.data;
  },
};
