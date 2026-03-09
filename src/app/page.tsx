import Hero from "@/components/Hero";
import Couple from "@/components/Couple";
import OurStory from "@/components/OurStory";
import Gallery from "@/components/Gallery";
import Venue from "@/components/Venue";
import SaveTheDate from "@/components/SaveTheDate";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Couple />
      <OurStory />
      <Gallery />
      <Venue />
      <SaveTheDate />
      <Footer />
    </main>
  );
}
