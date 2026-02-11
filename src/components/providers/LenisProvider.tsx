'use client'

import { useEffect, useRef, useState, createContext, useContext, ReactNode } from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { setLenisInstance } from '@/lib/utils'
import { useModal } from '@/lib/modal-context'

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
    /** Smooth wheel (mouse/trackpad) only; touch uses native scroll. */
    smoothWheel?: boolean
    touchMultiplier?: number
    wheelMultiplier?: number
}

export function LenisProvider({
    children,
    easing = easingFunctions.easeOutQuart,
    duration = 0.8,
    smoothWheel = true,
    touchMultiplier = 2,
    wheelMultiplier = 1,
}: LenisProviderProps) {
    const [lenis, setLenis] = useState<Lenis | null>(null)
    const lenisRef = useRef<Lenis | null>(null)
    const pathname = usePathname()
    const { isModalOpen } = useModal()
    const isModalOpenRef = useRef(isModalOpen)
    isModalOpenRef.current = isModalOpen

    useEffect(() => {
        // Initialize Lenis: smooth wheel only, native touch (scroll-only)
        const lenisInstance = new Lenis({
            duration,
            easing,
            smoothWheel,
            syncTouch: false, // Native touch scroll; Lenis only smooths wheel
            touchMultiplier,
            wheelMultiplier,
            infinite: false,
            lerp: 0.06, // Lower lerp = less momentum, more direct (default is ~0.1)
        })

        lenisRef.current = lenisInstance
        setLenis(lenisInstance) // Update state so context updates
        setLenisInstance(lenisInstance) // Set global reference for utility functions

        // RAF loop for smooth scrolling and Framer Motion integration
        // Skip Lenis when a modal is open so the modal can scroll instead
        function raf(time: number) {
            if (!isModalOpenRef.current) {
                lenisInstance.raf(time)
            }
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Handle route changes - scroll to top
        lenisInstance.scrollTo(0, { immediate: true })

        // Cleanup
        return () => {
            lenisInstance.destroy()
            setLenisInstance(null) // Clear global reference
            lenisRef.current = null
            setLenis(null) // Clear state
        }
    }, [duration, easing, smoothWheel, touchMultiplier, wheelMultiplier])

    // Reset scroll position on route change
    useEffect(() => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true })
        }
    }, [pathname])

    return (
        <LenisContext.Provider value={{ lenis }}>
            {children}
        </LenisContext.Provider>
    )
}
