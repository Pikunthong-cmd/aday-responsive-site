import { adayApiClientV1 } from "../lib/client";

export const authorAPI = {
  getById: async (id: number, page: number = 1, perPage: number = 12) => {
    const res = await adayApiClientV1.get(
      `/author/${id}?per_page=${perPage}&page=${page}`
    );
    return res.data;
  },
};