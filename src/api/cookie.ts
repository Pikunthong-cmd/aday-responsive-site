import { adayApiClientV1 } from "../lib/client";

export const CookieAPI = {
  getCookieConsent: async (skipCache: boolean,) => {
    const res = await adayApiClientV1.get(
      `/cookieconsent?skip_cache=${skipCache}`
    );
    return res.data;
  },
};