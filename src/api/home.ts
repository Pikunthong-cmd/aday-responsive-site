import { adayApiClientV1, adayApiClientV2 } from "../lib/client";

export const homeAPI = {
  getAll: async () => {
    const res = await adayApiClientV1.get("/home-options");
    return res.data;
  },

  getAllPost: async () => {
    const res = await adayApiClientV2.get(
      "/posts?per_page=3&page=1&categories=308&front=true",
    );
    return res.data;
  },

  getAllPostEvent: async () => {
    const res = await adayApiClientV2.get("/tags?slug=EVENT");
    return res.data;
  },

  getAllBanerVideo: async () => {
    const res = await adayApiClientV1.get("/home-banner-video");
    return res.data;
  },
};
