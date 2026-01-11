import localFont from "next/font/local";

export const lineSeedSansTH = localFont({
  src: [
    {
      path: "../public/fonts/line-seed/LINESeedSansTH_Th.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/line-seed/LINESeedSansTH_Rg.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/line-seed/LINESeedSansTH_Bd.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/line-seed/LINESeedSansTH_XBd.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/line-seed/LINESeedSansTH_He.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-line-seed",
});
