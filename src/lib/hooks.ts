import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for Intersection Observer with visibility detection
 */
export function useIntersectionObserver(
    threshold: number = 0.2,
    rootMargin: string = '0px 0px -100px 0px'
) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {
                threshold,
                rootMargin
            }
        )

        const currentRef = ref.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [threshold, rootMargin])

    return { ref, isVisible }
}

/**
 * Custom hook for mobile detection
 */
export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return isMobile
}

/**
 * Custom hook for reduced motion detection
 */
export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return prefersReducedMotion
}

/* Theme state is owned by next-themes — import { useTheme } from 'next-themes'.
   A local copy used to live here; it wrote the same localStorage key and fought
   the provider, so it was removed rather than left as a trap. */
