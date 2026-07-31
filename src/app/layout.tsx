import type { Metadata } from 'next'
import { newYork } from '@/lib/fonts'
import '@/styles/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { ModalProvider } from '@/lib/modal-context'
import { ThemeProvider } from 'next-themes'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
    title: 'Sean | Personal Website',
    description: 'Student passionate about creating beautiful, functional, and user-friendly digital experiences. Always learning, always building.',
    keywords: ['developer', 'portfolio', 'personal website', 'projects'],
    authors: [{ name: 'Sean' }],
    creator: 'Sean',
    metadataBase: new URL(SITE_URL),
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/logos/sean_logo.png', sizes: '32x32', type: 'image/png' },
            { url: '/logos/sean_logo.png', sizes: '16x16', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
        apple: '/logos/sean_logo.png',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SITE_URL,
        title: 'Sean | Personal Website',
        description: 'Student passionate about creating beautiful, functional, and user-friendly digital experiences. Always learning, always building.',
        siteName: 'Sean',
        images: [
            {
                url: '/logos/sean_logo.png',
                width: 1200,
                height: 630,
                alt: 'Sean - Personal Website',
                type: 'image/png',
            },
            {
                url: '/logos/sean_logo.png',
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
        images: ['/logos/sean_logo.png'],
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
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Clash Display is imported in globals.css. Warm both hops up front:
                    api.* serves the @font-face CSS, cdn.* serves the .woff2 files.
                    crossOrigin is required on the cdn hint — font files are fetched in
                    CORS mode, so a non-CORS preconnect would open an unusable connection. */}
                <link rel="preconnect" href="https://api.fontshare.com" />
                <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
            </head>
            <body
                className="min-h-screen antialiased bg-background text-foreground"
                style={{
                    fontFamily: newYork.style.fontFamily,
                    backgroundColor: 'var(--background)',
                }}
            >
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <ModalProvider>
                        <LenisProvider>
                            {children}
                            <Toaster />
                        </LenisProvider>
                    </ModalProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
