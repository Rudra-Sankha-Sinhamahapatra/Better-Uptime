export const FooterGradient = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-green-500/60 via-green-500/5 to-green-500/40 blur-3xl"/>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-green-500/60 via-green-500/5 to-green-500/40 blur-3xl"/>
    </div>
    )
}