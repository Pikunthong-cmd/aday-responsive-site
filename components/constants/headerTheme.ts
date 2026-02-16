export const HEADER_THEME_CLASS = {
  default: "bg-black",

  // Categories / Main
  "artist-talk": "bg-[#097B55]",
  "draft-till-done": "bg-[#5D4F9A]",
  "what-a-day": "bg-[#FAA339]",
  portfolio: "bg-[#FE552C]",
  "behind-the-art": "bg-[#252872]",
  "outstation-art": "bg-[#097B55]",

  // Update / Other
  "a-day-update": "bg-[#FE552C]",
  "event-update": "bg-[#FE552C]",
  "photo-stories": "bg-[#252872]",
  agenda: "bg-[#FBAC41]",
  "live-in-a-day": "bg-[#097B55]",
  "a-doc": "bg-[#5F1B13]",
  heartsell: "bg-[#FE552C]",

  // Added
  "q-and-a-day-interview": "bg-[#FE552C]",
  "people-power-life": "bg-[#252872]",
  founder: "bg-[#5F1B13]",

  // Series / Special
  "a-better-day": "bg-[#FAA339]",
  "crackracter-branding": "bg-[#FE552C]",
  "made-my-green": "bg-[#097B55]",
  "once-upon-a-song": "bg-[#097B55]",
  "see-saw-scene": "bg-[#5F1B13]",
  "witch-a-boo": "bg-[#5F1B13]",

  // Thai slugs (ต้องตรงกับ slug หลัง decode)
  "ที่ชอบ": "bg-[#FBAC41]",
  "เจอนั่นที่ย่านนี้-journey-ที่ย": "bg-[#FBAC41]",
  "บันทึกการอ่าน": "bg-[#FE552C]",
  "ของที่รฤก": "bg-[#FE552C]",
  "ตามไปดู": "bg-[#252872]",
} as const;

export type HeaderTheme = keyof typeof HEADER_THEME_CLASS;
