import { Navbar } from "@/components/Navbar";
import Websites from "@/components/Websites";

export default function Page() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <Navbar/>
            <main className="flex-1 mt-10">
                <Websites/>
            </main>
        </div>
    );
}