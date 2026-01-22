// app/data/column.mock.ts
export type ColumnBlock =
  | { type: "image"; src: string; alt?: string }
  | { type: "kicker"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "pullquote"; left: string; right: string }
  | { type: "twoImages"; leftSrc: string; rightSrc: string; leftAlt?: string; rightAlt?: string };

export type RelatedPost = {
  id: string;
  title: string;
  thumbUrl: string;
  href: string;
  category?: string;
};

export const columnMock: {
  hero: { imageUrl: string; title: string; subtitle: string };
  meta: { date: string; category: string; author: string };
  blocks: ColumnBlock[];
  related: RelatedPost[];
} = {
  hero: {
    imageUrl: "/images/mock/column-hero.jpg",
    title: "Alie Blackcobra",
    subtitle:
      "ศิลปินผู้ใช้ตัวตนเป็นเครื่องมือสื่อสาร... (ใส่ข้อความจริงภายหลังได้)",
  },
  meta: {
    date: "21/06/2025",
    category: "ARTIST TALK",
    author: "Denis สติอิฐ",
  },
  blocks: [
    { type: "image", src: "/images/mock/column-1.jpg", alt: "column image 1" },
    { type: "paragraph", text: "เราโตมาแบบ High School แต่ก็ฟัง Britney Spears คำถามเรื่องเพศก็เป็นสิ่งที่ค้นหามาตลอดเหมือนกัน" },
    { type: "heading", text: "อะไรคือจุดเริ่มต้นและจุดหมาย" },
    { type: "paragraph", text: "ใส่ข้อความต่อ..." },

    { type: "image", src: "/images/mock/column-2.jpg", alt: "column image 2" },
    {
      type: "pullquote",
      left: "เราต้องการถามอะไร\nและคำถามนั้นสำคัญแค่ไหน",
      right: "ใครเป็นผู้ตั้งคำถาม\nและเขาต้องการคำตอบอะไร",
    },

    {
      type: "twoImages",
      leftSrc: "/images/mock/column-wide-1.jpg",
      rightSrc: "/images/mock/column-wide-2.jpg",
      leftAlt: "wide left",
      rightAlt: "wide right",
    },

    { type: "heading", text: "บทสรุป" },
    { type: "paragraph", text: "ใส่บทสรุป..." },
  ],
  related: [
    {
      id: "r1",
      title: "ชื่อบทความที่เกี่ยวข้อง 1",
      thumbUrl: "/images/mock/related-1.jpg",
      href: "/page/category/column/related-1",
      category: "COLUMN",
    },
    {
      id: "r2",
      title: "ชื่อบทความที่เกี่ยวข้อง 2",
      thumbUrl: "/images/mock/related-2.jpg",
      href: "/page/category/column/related-2",
      category: "COLUMN",
    },
    {
      id: "r3",
      title: "ชื่อบทความที่เกี่ยวข้อง 3",
      thumbUrl: "/images/mock/related-3.jpg",
      href: "/page/category/column/related-3",
      category: "COLUMN",
    },
  ],
};
