import { adayApiClientV1 } from "../lib/client";

export const SearchAPI = {
  getAll: async (keyword: string, page = 1, perPage = 8) => {
    const res = await adayApiClientV1.get(
      `/search/${encodeURIComponent(keyword)}?per_page=${perPage}&page=${page}`
    );
    return res.data;
  },
};