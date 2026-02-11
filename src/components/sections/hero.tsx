'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { scrollToSection } from '@/lib/utils'
import { useEffect, useState, useRef } from 'react'
import { useLenis } from '@/components/providers/LenisProvider'

export function Hero() {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768 // md breakpoint
        }
        return false
    })
    const [blurAmount, setBlurAmount] = useState(0)
    const [overlayOpacity, setOverlayOpacity] = useState(0)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const lenis = useLenis()

    // Track scroll position using Framer Motion
    const { scrollY } = useScroll()

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768) // md breakpoint
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'))
        }

        checkTheme()

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()
    }, [])

    // Calculate blur based on scroll position (throttled to reduce re-renders)
    useEffect(() => {
        if (!lenis) return

        const THROTTLE_MS = 40 // ~25 updates/sec instead of 60
        const maxBlur = 15 // Slightly lower for cheaper filter cost
        let rafId: number | null = null
        let lastUpdate = 0
        let pendingScroll: number | null = null

        const applyScroll = (scroll: number) => {
            const viewportHeight = window.innerHeight
            const scrollThreshold = viewportHeight * 0.5
            const blurRange = 200
            const maxOverlayOpacity = isDarkMode ? 0.85 : 0.6

            if (scroll <= scrollThreshold) {
                setBlurAmount(0)
                setOverlayOpacity(0)
            } else {
                const scrollPast = scroll - scrollThreshold
                const blurProgress = Math.min(scrollPast / blurRange, 1)
                // Round to reduce repaints: blur to whole pixels, opacity to 2 decimals
                const blur = Math.round(blurProgress * maxBlur)
                const opacity = Math.round(blurProgress * maxOverlayOpacity * 100) / 100
                setBlurAmount(blur)
                setOverlayOpacity(opacity)
            }
        }

        const handleScroll = ({ scroll }: { scroll: number; limit: number }) => {
            pendingScroll = scroll
            const now = performance.now()
            if (rafId !== null) return
            if (now - lastUpdate >= THROTTLE_MS) {
                lastUpdate = now
                applyScroll(scroll)
                pendingScroll = null
                return
            }
            rafId = requestAnimationFrame(() => {
                rafId = null
                lastUpdate = performance.now()
                if (pendingScroll !== null) {
                    applyScroll(pendingScroll)
                    pendingScroll = null
                }
            })
        }

        lenis.on('scroll', handleScroll)
        applyScroll(lenis.scroll)

        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId)
            lenis.off('scroll', handleScroll)
        }
    }, [lenis, isDarkMode])

    // Fallback to Framer Motion scroll when Lenis is not available
    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (!lenis) {
            const viewportHeight = window.innerHeight
            const scrollThreshold = viewportHeight * 0.5
            const blurRange = 200
            const maxBlur = 15
            const maxOverlayOpacity = isDarkMode ? 0.85 : 0.4

            if (latest <= scrollThreshold) {
                setBlurAmount(0)
                setOverlayOpacity(0)
            } else {
                const scrollPast = latest - scrollThreshold
                const blurProgress = Math.min(scrollPast / blurRange, 1)
                setBlurAmount(Math.round(blurProgress * maxBlur))
                setOverlayOpacity(Math.round(blurProgress * maxOverlayOpacity * 100) / 100)
            }
        }
    })
    return (
        <motion.section
            ref={sectionRef}
            id="home"
            className="min-h-screen flex items-center justify-center fixed top-0 left-0 right-0 z-[1] overflow-x-hidden overflow-y-visible dark:bg-[#12121a]"
            style={{
                filter: `blur(${blurAmount}px)`,
                transition: 'filter 0.3s ease-out',
                backgroundColor: isDarkMode ? undefined : '#E8DDD0',
            }}
        >
            {/* Dark overlay that fades in on scroll */}
            <div
                className="absolute inset-0 z-[20] pointer-events-none"
                style={{
                    backgroundColor: isDarkMode ? '#181825' : '#F2E8DD',
                    opacity: overlayOpacity,
                    transition: 'opacity 0.3s ease-out, background-color 0.3s ease-out',
                }}
            />

            {/* SEAN Display Text - Stretched Edge to Edge */}
            <div
                className="absolute top-24 md:top-32 inset-x-0 w-screen overflow-visible flex flex-col items-center justify-center -translate-y-4 md:-translate-y-6"
                style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
            >
                <div className="flex flex-col items-center relative w-full">
                    {/* Wall overlay that moves up to reveal text */}
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: '-100%' }}
                        transition={{
                            type: 'spring',
                            stiffness: 40,
                            damping: 20
                        }}
                        className="absolute z-10 dark:bg-[#12121a] w-full"
                        style={{
                            height: '50vh',
                            top: '-25vh',
                            left: 0,
                            right: 0,
                            backgroundColor: isDarkMode ? '#12121a' : '#E8DDD0',
                        }}
                    />

                    {/* Text container */}
                    <div className="relative w-full flex justify-center">
                        <motion.div
                            initial={{ y: '-30vh' }} // start above visible area (behind wall)
                            animate={{ y: 0, visibility: 'visible' }} // slide down into view
                            transition={{ type: 'spring', stiffness: 40, damping: 20 }} // slower drop-in
                            className="flex flex-col items-center"
                            style={{ visibility: 'hidden', width: 'fit-content' }} // keep hidden before animation starts
                        >
                            <h2
                                className="text-[clamp(6rem,26vw,999rem)] tracking-[-0.05em] lg:tracking-[-0.05em] font-semibold hero-gradient-text uppercase leading-[0.85] text-center inline-block"
                                style={{
                                    fontFamily: "'Clash Display', sans-serif",
                                    width: 'auto',
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    textAlign: 'center',
                                    transform: 'scaleX(1.45) scaleY(1.15)',
                                    transformOrigin: 'center',
                                }}
                            >
                                SEAN
                            </h2>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-6 w-[95%]"
                    />
                </div>

                <div className="mt-14 md:mt-16 text-[clamp(1.5rem,3vw,2rem)] w-full max-w-5xl px-6 md:px-10 text-foreground-secondary font-bold uppercase tracking-[0.2em] flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between mx-auto gap-10 md:gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center leading-tight"
                    >
                        <span className="block">NUS Computer</span>
                        <span className="block">Engineering</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: isMobile ? 1.1 : 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center leading-tight"
                    >
                        <span className="block">Thoughtful &</span>
                        <span className="block">User-Centric</span>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-20 md:bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.button
                    onClick={() => scrollToSection('about')}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="p-2 rounded-full hover:bg-surface/50 transition-colors duration-300"
                    aria-label="Scroll to about section"
                >
                    <ChevronDown className="w-6 h-6 text-foreground-secondary" />
                </motion.button>
            </motion.div>
        </motion.section>
    )
}
