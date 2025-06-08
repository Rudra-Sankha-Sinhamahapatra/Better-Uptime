export const NavbarGradient = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-green-500/40 via-green-500/10 to-transparent blur-[100px]"/>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-green-500/40 via-green-500/10 to-transparent blur-[100px]"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-gradient-to-r from-transparent via-green-500/20 to-transparent blur-[120px]"/>
    </div>
    )
}