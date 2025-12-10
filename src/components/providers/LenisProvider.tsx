'use client'

import { useEffect, useRef, createContext, useContext, ReactNode } from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { setLenisInstance } from '@/lib/utils'

// Easing functions
export const easingFunctions = {
    // Ease-in-out (default)
    easeInOut: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // Elastic easing
    elastic: (t: number) => {
        const c4 = (2 * Math.PI) / 3
        return t === 0
            ? 0
            : t === 1
                ? 1
                : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
    },
    // Cubic bezier approximation
    cubicBezier: (t: number) => {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2
    },
    // Ease-out
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    // Ease-in
    easeIn: (t: number) => t * t * t,
    // Less momentum - more direct easing
    easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
}

type LenisContextType = {
    lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export const useLenis = () => {
    const context = useContext(LenisContext)
    if (!context) {
        throw new Error('useLenis must be used within LenisProvider')
    }
    return context.lenis
}

interface LenisProviderProps {
    children: ReactNode
    easing?: (t: number) => number
    duration?: number
    smoothWheel?: boolean
    smoothTouch?: boolean
    touchMultiplier?: number
    wheelMultiplier?: number
}

export function LenisProvider({
    children,
    easing = easingFunctions.easeOutQuart,
    duration = 0.8,
    smoothWheel = true,
    smoothTouch = true,
    touchMultiplier = 2,
    wheelMultiplier = 1,
}: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null)
    const pathname = usePathname()

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration,
            easing,
            smoothWheel,
            touchMultiplier,
            wheelMultiplier,
            infinite: false,
            lerp: 0.08, // Lower lerp = less momentum, more direct (default is ~0.1)
        })

        lenisRef.current = lenis
        setLenisInstance(lenis) // Set global reference for utility functions

        // RAF loop for smooth scrolling and Framer Motion integration
        // This updates the actual scroll position that Framer Motion's useScroll reads
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Handle route changes - scroll to top
        lenis.scrollTo(0, { immediate: true })

        // Cleanup
        return () => {
            lenis.destroy()
            setLenisInstance(null) // Clear global reference
            lenisRef.current = null
        }
    }, [duration, easing, smoothWheel, touchMultiplier, wheelMultiplier])

    // Reset scroll position on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        }
    }, [pathname])

    return (
        <LenisContext.Provider value={{ lenis: lenisRef.current }}>
            {children}
        </LenisContext.Provider>
    )
}
