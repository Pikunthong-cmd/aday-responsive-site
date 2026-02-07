export type VideoItem = {
  id: string;
  title: string;
  subtitle?: string; // เช่น "a day HOW"
  description?: string; // ข้อความเล็กใต้ title
  dateLabel?: string; // เช่น "Thursday, June 23, 2025"
  href?: string;
  thumbnailUrl: string;
  badge?: string; // เช่น "A Day HOW"
  ctaLabel?: string; // เช่น "View All"
  image?:string
};
