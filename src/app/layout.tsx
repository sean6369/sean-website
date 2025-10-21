import type { Metadata } from 'next'
import { newYork, menlo } from '@/lib/fonts'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
    title: 'Sean | Personal Website',
    description: 'Student passionate about creating beautiful, functional, and user-friendly digital experiences. Always learning, always building.',
    keywords: ['developer', 'portfolio', 'personal website', 'projects'],
    authors: [{ name: 'Sean' }],
    creator: 'Sean',
    metadataBase: new URL('https://your-domain.com'),
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/images/sean_logo.png', sizes: '32x32', type: 'image/png' },
            { url: '/images/sean_logo.png', sizes: '16x16', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
        apple: '/images/sean_logo.png',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://your-domain.com',
        title: 'Sean | Personal Website',
        description: 'Student passionate about creating beautiful, functional, and user-friendly digital experiences. Always learning, always building.',
        siteName: 'Sean',
        images: [
            {
                url: '/images/sean_logo.png',
                width: 1200,
                height: 630,
                alt: 'Sean - Personal Website',
                type: 'image/png',
            },
            {
                url: '/images/sean_logo.png',
                width: 800,
                height: 600,
                alt: 'Sean - Personal Website',
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sean | Personal Website',
        description: 'Student passionate about creating beautiful, functional, and user-friendly digital experiences. Always learning, always building.',
        images: ['/images/sean_logo.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body
                className="min-h-screen antialiased bg-background text-foreground"
                style={{
                    fontFamily: newYork.style.fontFamily,
                    backgroundColor: 'var(--background)',
                }}
            >
                {children}
                <Toaster />
            </body>
        </html>
    )
}
