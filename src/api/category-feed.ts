import { adayApiClientV2 } from "../lib/client";

export const categoryFeedAPI = {
  getCategoryBySlug: async (slug: string) => {
    console.log("<<<<<<<",slug)
    console.log(await adayApiClientV2.get(`/categories?slug=${slug}`))
    const res = await adayApiClientV2.get(`/categories?slug=${slug}`);
    return res.data;
  },

  getPostsByCategoryId: async (
    categoryId: number,
    offset: number,
    perPage = 8
  ) => {
    const res = await adayApiClientV2.get(
      `/posts?page=1&per_page=${perPage}&categories=${categoryId}&offset=${offset}`
    );
    return res.data;
  },
};
