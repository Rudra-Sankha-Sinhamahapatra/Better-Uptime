export const HeroGradient = () => {
    return (
        <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-green-500/20 via-green-500/5 to-transparent blur-3xl"/>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-green-500/20 via-green-500/5 to-transparent blur-3xl"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-2/3 bg-gradient-to-r from-transparent via-green-500/30 to-transparent blur-[100px]"/>
    </div>
    )
}