import { adayApiClientV1, adayApiClientV2 } from "../lib/client";

export const authorAPI = {
  getById: async (id: number, page: number = 1, perPage: number = 100) => {
    const res = await adayApiClientV1.get(
      `/author/${id}?per_page=${perPage}&page=${page}`
    );
    return res.data;
  },
  getUserBySlug: async (slug: string) => {
    const res = await adayApiClientV2.get(
      `/users?slug=${slug}`
    );
    return res.data;
  },
};