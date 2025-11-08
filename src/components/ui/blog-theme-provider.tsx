'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function BlogThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [isThemeReady, setIsThemeReady] = useState(false)

    // Use layoutEffect to run before paint
    useLayoutEffect(() => {
        // Force light mode immediately
        if (resolvedTheme === 'dark' || theme === 'dark') {
            setTheme('light')
            // Wait a tick for theme to actually apply
            const timer = setTimeout(() => {
                setIsThemeReady(true)
            }, 100)
            return () => clearTimeout(timer)
        } else {
            setIsThemeReady(true)
        }
    }, [])

    // Don't render until theme is set correctly
    if (!isThemeReady) {
        return (
            <div className="min-h-screen bg-gray-100" />
        )
    }

    return <>{children}</>
}

