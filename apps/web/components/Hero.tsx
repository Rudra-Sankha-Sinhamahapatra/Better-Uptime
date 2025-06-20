"use client"
import Image from "next/image"
import { HeroGradient } from "./ui/HeroGradient"
import { useRouter } from "next/navigation"

export const Hero = () => {
    const router = useRouter()
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-black pb-32">
           <HeroGradient/>
            <div className="relative z-10 text-white text-center px-4 max-w-4xl mt-40">
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">Monitor Your Websites and Get Notified</h1>
                <p className="text-xl mb-8 text-gray-300">Monitor your websites and get notified when they go down or come back online.</p>
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold 
                    hover:bg-green-700 transition-all duration-300" onClick={() => router.push('/websites')}>
                    Get Started
                </button>
            </div>
            <div className="relative mt-16 w-full max-w-[1100px] mx-auto items-center px-4">
                <Image 
                    src="https://pbs.twimg.com/media/GtSYMgbbMAQ54nj?format=png&name=medium" 
                    alt="Hero Image" 
                    width={1100} 
                    height={600} 
                    className="rounded-lg shadow-2xl"
                    style={{ 
                        objectFit: 'contain'
                    }}
                />
            </div>
        </div>
    )
}