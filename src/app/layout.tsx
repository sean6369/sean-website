import type { Metadata } from 'next'
import { newYork, menlo } from '@/lib/fonts'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
    title: 'Sean | Personal Website',
    description: 'A modern personal website showcasing projects, skills, and experiences.',
    keywords: ['developer', 'portfolio', 'personal website', 'projects'],
    authors: [{ name: 'Sean' }],
    creator: 'Sean',
    metadataBase: new URL('https://your-domain.com'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://your-domain.com',
        title: 'Sean | Personal Website',
        description: 'A modern personal website showcasing projects, skills, and experiences.',
        siteName: 'Sean',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Sean - Personal Website',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sean | Personal Website',
        description: 'A modern personal website showcasing projects, skills, and experiences.',
        images: ['/og-image.jpg'],
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
                className="min-h-screen antialiased"
                style={{
                    fontFamily: newYork.style.fontFamily,
                }}
            >
                {children}
            </body>
        </html>
    )
}
