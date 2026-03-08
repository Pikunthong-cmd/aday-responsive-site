import { adayApiClientV1 } from "../lib/client";

export const SearchAPI = {
  getAll: async (slug: string) => {
    const res = await adayApiClientV1.get(`/search/${encodeURIComponent(slug)}`);
    return res.data;
  },
};