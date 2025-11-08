import { BlogThemeProvider } from '@/components/ui/blog-theme-provider'
import Script from 'next/script'
import './blog-theme.css'

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Script id="blog-theme-init" strategy="beforeInteractive">
                {`
                    // Force light mode for blog pages immediately
                    if (typeof window !== 'undefined') {
                        document.documentElement.classList.remove('dark');
                        localStorage.setItem('theme', 'light');
                    }
                `}
            </Script>
            <BlogThemeProvider>
                <div className="blog-page bg-gray-100 dark:bg-gray-900 min-h-screen">
                    {children}
                </div>
            </BlogThemeProvider>
        </>
    )
}

