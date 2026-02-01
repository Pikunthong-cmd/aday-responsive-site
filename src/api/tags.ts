import { adayApiClientV2 } from "../lib/client";


export const tagsAPI = {
  getAll: async () => {
    const res = await adayApiClientV2.get("/tags");
    return res.data;
  },

  getEvent: async () => {
    const res = await adayApiClientV2.get("/tags?slug=EVENT");
    return res.data;
  },
};
