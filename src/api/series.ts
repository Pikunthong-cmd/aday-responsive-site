import { adayApiClientV2 } from "../lib/client";

export const seriesAPI = {

  getCategoriesById: async (
    categoryId: number,
    offset: number,
    perPage = 9
  ) => {
    const res = await adayApiClientV2.get(
      `/posts?page=1&per_page=${perPage}&categories=${categoryId}&offset=${offset}`
    );
    return res.data;
  },

   getAll: async () => {
    const res = await adayApiClientV2.get(`/categories?slug=series`);
    return res.data;
  },
};
