import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
   <div className="bg-black">
    <Navbar/>
    <Hero/>
    <Features/>
    <Footer/>
   </div>
  );
}
