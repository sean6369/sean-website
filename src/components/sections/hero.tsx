'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import { scrollToSection } from '@/lib/utils'
import LiquidEther from '@/components/ui/LiquidEther'
import TextType from '@/components/ui/TextType'
import { useEffect, useState } from 'react'

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/sean6369',
        icon: Github,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/lee-su-kiat-sean-19211a33b',
        icon: Linkedin,
    },
    {
        name: 'Email',
        href: 'mailto:seanleesukiat@gmail.com',
        icon: Mail,
    },
]

export function Hero() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        // Check if dark mode is active
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark')
            setIsDarkMode(isDark)
        }

        // Initial check
        checkTheme()

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        return () => observer.disconnect()
    }, [])

    // Theme-aware colors for LiquidEther
    const getLiquidEtherColors = () => {
        if (isDarkMode) {
            // Dark theme: Anupuccin Mocha colors
            return ['#cba6f7', '#f5c2e7', '#89dceb']
        } else {
            // Light theme: Rose Pine colors (lighter versions)
            return ['#f6c177', '#ea9a97', '#3e8fb0'] // Gold, Rose, Foam
        }
    }

    // Theme-aware background color for smoke effect
    const getBackgroundColor = () => {
        if (isDarkMode) {
            // Dark theme: transparent (default)
            return 'transparent'
        } else {
            // Light theme: match the main background color
            return '#F0E6DD' // Same as main background
        }
    }

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* LiquidEther Background */}
            <div className="absolute inset-0 z-0">
                <LiquidEther
                    key={isDarkMode ? 'dark' : 'light'} // Force re-render when theme changes
                    colors={getLiquidEtherColors()}
                    backgroundColor={getBackgroundColor()}
                    mouseForce={25}
                    cursorSize={120}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.6}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.3}
                    autoIntensity={1.8}
                    takeoverDuration={0.4}
                    autoResumeDelay={4000}
                    autoRampDuration={0.8}
                />
            </div>

            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-background/20 z-5 pointer-events-none" />

            <div className="container-custom relative z-10 pointer-events-none">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Main heading with typing animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                            <TextType
                                text={[
                                    "Hello, I'm Sean",
                                    "Hello, I'm a Developer",
                                    "Hello, I'm a Creator"
                                ]}
                                typingSpeed={50}
                                pauseDuration={2000}
                                initialDelay={500}
                                showCursor={true}
                                cursorCharacter="|"
                                loop={false}
                                className="gradient-text"
                                onSentenceComplete={(sentence, index) => {
                                    // Stop after typing the first sentence completely
                                    if (index === 0) {
                                        // The animation will automatically stop since loop is false
                                    }
                                }}
                            />
                        </h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }} // Show immediately but with slight delay
                            className="text-xl md:text-2xl lg:text-3xl text-foreground-secondary mb-2"
                        >
                            <TextType
                                text='const role = NUS Computer Engineering Student'
                                typingSpeed={30}
                                initialDelay={1200} // Start typing at 1.2s
                                showCursor={true}
                                cursorCharacter="_"
                                loop={false}
                                className="font-menlo text-accent" // Uses theme-aware accent color
                            />
                        </motion.div>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }} // Show container early
                        className="text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto mb-8 leading-relaxed"
                    >
                        <TextType
                            text="I am dedicated to building practical, impactful, and user-friendly products that bridge the gap between ideas and execution. Passionate about creating solutions that combine functionality with beautiful design."
                            typingSpeed={15}
                            initialDelay={2000} // Start typing at 2s
                            showCursor={true}
                            cursorCharacter="|"
                            loop={false}
                            className="text-center font-medium"
                        />
                    </motion.div>


                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 8.0 }} // Delayed to appear at 8s
                        className="flex justify-center gap-6 mb-16 pointer-events-auto"
                    >
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 rounded-full bg-surface hover:bg-surface-secondary transition-all duration-300 group"
                                aria-label={link.name}
                            >
                                <link.icon className="w-5 h-5 text-foreground-secondary group-hover:text-primary transition-colors duration-300" />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 9.0 }} // Delayed to appear at 9s
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.button
                    onClick={() => scrollToSection('about')}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-2 rounded-full hover:bg-surface/50 transition-colors duration-300 pointer-events-auto"
                    aria-label="Scroll to about section"
                >
                    <ChevronDown className="w-6 h-6 text-foreground-secondary" />
                </motion.button>
            </motion.div>
        </section>
    )
}
