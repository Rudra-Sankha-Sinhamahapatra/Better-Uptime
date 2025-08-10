import { features } from "@/utils/features"
import { Card } from "./ui/Card"


export const Features = () => {

    return (
        <div className="relative py-24 px-6 bg-black">

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-green-500/20 via-green-500/5 to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-green-500/20 via-green-500/5 to-transparent blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-2/3 bg-gradient-to-r from-transparent via-green-500/30 to-transparent blur-[100px]" />
            </div>

            <div className="relative z-10">
                <h1 className="text-4xl font-bold text-center text-white mb-4">Features</h1>
                <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
                    Everything you need to keep your website running smoothly
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <Card key={index} className="group bg-black/60 backdrop-blur-sm border border-gray-800/50 hover:border-green-500/50 transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent rounded-lg" />
                            <div className="relative z-10">
                                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h2 className="text-xl font-semibold text-white mb-3">{feature.title}</h2>
                                <p className="text-gray-300">{feature.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}