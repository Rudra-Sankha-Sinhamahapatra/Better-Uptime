export const Card = ({children, className}: {children: React.ReactNode, className?: string}) => {
    return (
        <div className={`relative bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg ${className}`}>
            {children}
        </div>
    )
}