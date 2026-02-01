import { adayApiClientV1, adayApiClientV2 } from "../lib/client";

export const postsAPI = {
  getAll: async () => {
    const res = await adayApiClientV2.get("/home-options");
    return res.data;
  },

  getVideoHome: async () => {
    const res = await adayApiClientV2.get("/posts?per_page=3&page=1&categories=308&front=true");
    return res.data;
  },

  getEventHome: async (tagId:any) => {
    const res = await adayApiClientV2.get(`posts?tags=${tagId}&per_page=3&page=1`);
    return res.data;
  },
};
