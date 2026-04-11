export const HEADER_THEME_CLASS = {
  default: "bg-black",

  // People
  "q-and-a-day-interview": "bg-[#ead50d]",
  "people-power-life": "bg-[#ead50d]",
  founder: "bg-[#ead50d]",
  relationships: "bg-[#ead50d]",

  // Art & Design
  "artist-talk": "bg-[#ff4500]",
  "draft-till-done": "bg-[#ff4500]",
  portfolio: "bg-[#ff4500]",
  heartsell: "bg-[#ff4500]",

  // Life & Culture
  "a-better-day": "bg-[#9ac2ff]",
  "see-saw-scene": "bg-[#9ac2ff]",
  "witch-a-boo": "bg-[#9ac2ff]",
  "บันทึกการอ่าน": "bg-[#9ac2ff]",
  "ตามไปดู": "bg-[#9ac2ff]",
  "ที่ชอบ": "bg-[#9ac2ff]",
  "เจอนั่นที่ย่านนี้-journey-ที่ย": "bg-[#9ac2ff]",
  "photo-stories": "bg-[#9ac2ff]",

  // Others
  "what-a-day": "bg-[#9bd941]",
  agenda: "bg-[#9bd941]",
  "live-in-a-day": "bg-[#9bd941]",
  "a-doc": "bg-[#9bd941]",
  "day-for-night": "bg-[#9bd941]",
  magazine: "bg-[#9bd941]",
  series: "bg-[#9bd941]",
  podcast: "bg-[#9bd941]",
  video: "bg-[#9bd941]",
  "คนสันปก": "bg-[#9bd941]",

  // ยังไม่มีในตารางชัดเจน เลือกกลุ่มใกล้เคียงไว้ก่อน
  "behind-the-art": "bg-[#ff4500]",
  "outstation-art": "bg-[#ff4500]",
  "a-day-update": "bg-[#9bd941]",
  "event-update": "bg-[#9bd941]",
  "crackracter-branding": "bg-[#ff4500]",
  "made-my-green": "bg-[#9bd941]",
  "once-upon-a-song": "bg-[#9bd941]",
  "ของที่รฤก": "bg-[#9ac2ff]",
} as const;

export type HeaderTheme = keyof typeof HEADER_THEME_CLASS;