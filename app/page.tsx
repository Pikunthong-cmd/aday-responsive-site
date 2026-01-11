import Hero from "@/components/home/Hero";
import ImageStripSlider from "@/components/home/ImageStripSlider";
import MagazineType from "@/components/home/MagazineType";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Hero />
      <ImageStripSlider />
      <MagazineType />
    </div>
  );
}
