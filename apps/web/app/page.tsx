import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Features } from "@/components/Features";

export default function Home() {
  return (
   <div className="bg-black">
    <Navbar/>
    <Hero/>
    <Features/>
   </div>
  );
}
