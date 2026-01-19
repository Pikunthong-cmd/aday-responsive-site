// data/artistTalk.mock.ts
export interface ArtistTalk {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  highlight?: boolean;
}

export const artistTalkMock: ArtistTalk[] = [
  {
    id: 1,
    image: "/images/mock/artist-1.jpg",
    title:
      "นิทานในวัยเยาว์ทำให้รู้ว่าผู้ใหญ่อย่างไร้ ‘เชิร์ด-นิสา’ นักเล่านิทานว่าด้วยชีวิตและความตาย",
    subtitle: "เรื่อง ศฤณี แก้วพรรณ",
  },
  {
    id: 2,
    image: "/images/mock/artist-2.jpg",
    title:
      "บรรยากาศและวงดนตรีอิสระเกิดจาก ‘Rootsman Creation’ ของเทศกาลศิลป์",
    subtitle: "เรื่อง ศฤณี แก้วพรรณ",
  },
  {
    id: 3,
    image: "/images/mock/artist-5.jpg",
    title:
      "ถวิล–พนมไชย ศิลปินผู้ยังทดลองอยู่ และชีวิตที่หมุนเปลี่ยนโลก 7 ห่วงชั่วคราว",
    subtitle: "เรื่อง ศฤณี แก้วพรรณ",
  },
  {
    id: 4,
    image: "/images/mock/artist-4.jpg",
    title:
      "‘VARIS’ ศิลปินอินดี้สุดดนตรีนอกกรอบ หลอมรวมทั้งหมดจนซิงเกิล can’t let u go",
    subtitle: "เรื่อง ศฤณี แก้วพรรณ",
    highlight: true,
  },
];
