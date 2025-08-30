export const Loading = () => {
    return <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-green-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
    </div>
}