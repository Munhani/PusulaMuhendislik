import HeroSlider from "@/components/HeroSlider";
import Services from "@/components/Services";
import Catalog from "@/components/Catalog";
import About from "@/components/About";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <Services />
      <Catalog />
      <About />
    </main>
  );
}
