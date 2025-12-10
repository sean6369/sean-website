'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { scrollToSection } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function Hero() {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768 // md breakpoint
        }
        return false
    })

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768) // md breakpoint
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-x-hidden overflow-y-visible">
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
                        className="absolute z-10 bg-background w-full"
                        style={{
                            height: '50vh',
                            top: '-25vh',
                            left: 0,
                            right: 0,
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

                <div className="mt-14 md:mt-16 text-[clamp(1.5rem,3vw,2rem)] w-full max-w-5xl px-6 md:px-10 text-foreground-secondary font-medium uppercase tracking-[0.2em] flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between mx-auto gap-10 md:gap-6">
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
        </section>
    )
}
