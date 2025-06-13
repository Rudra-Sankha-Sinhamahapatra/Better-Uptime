import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
   <div className="bg-black">
    <Hero/>
    <Features/>
    <Footer/>
   </div>
  );
}
