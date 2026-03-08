import { adayApiClientV1 } from "../lib/client";

export const authorAPI = {
  getCategoriesById: async (id: number, page: number, perPage: number) => {
    const res = await adayApiClientV1.get(
      `/author/${id}?per_page=${perPage}&page=${page}`
    );
    return res.data;
  },
};