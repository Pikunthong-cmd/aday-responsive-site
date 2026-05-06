import { adayApiClientV2 } from "../lib/client";


export const tagsAPI = {
  getAll: async () => {
    const res = await adayApiClientV2.get("/tags");
    return res.data;
  },

  getEvent: async () => {
    const res = await adayApiClientV2.get("/categories?slug=activities");
    return res.data;
  },

  getMainCourse: async () => {
    const res = await adayApiClientV2.get("/tags?slug=maincourse");
    return res.data;
  },
};
