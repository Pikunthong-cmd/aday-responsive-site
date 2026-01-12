
import Category from "@/components/home/Category";
import Event from "@/components/home/Event";
import Experimental from "@/components/home/Experimental";
import Hero from "@/components/home/Hero";
import ImageStripSlider from "@/components/home/ImageStripSlider";
import MagazineType from "@/components/home/MagazineType";

export default function Home() {
  return (
    <div className="bg-[#EFEEE7]">
      <Hero />
      <ImageStripSlider />
      <MagazineType />
      <Experimental />
      <Category />
      <Event />
    </div>
  );
}
