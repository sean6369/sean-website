import './blog-theme.css'

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="blog-page bg-gray-100 dark:bg-blog-dark min-h-screen">
            {children}
        </div>
    )
}

