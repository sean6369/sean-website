'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Moon, Sun } from 'lucide-react'
import { cn, scrollToSection } from '@/lib/utils'
import { useModal } from '@/lib/modal-context'
import StaggeredMenu from './StaggeredMenu'
import Stepper from './stepper'
import {
    Navbar,
    NavBody,
    MobileNav,
    MobileNavHeader,
} from './resizable-navbar'

const navItems = [
    { id: 'home', label: 'Home', name: 'Home', link: '#home' },
    { id: 'about', label: 'About', name: 'About', link: '#about' },
    { id: 'milestones', label: 'Milestones', name: 'Milestones', link: '#milestones' },
    { id: 'projects', label: 'Projects', name: 'Projects', link: '#projects' },
    { id: 'contact', label: 'Contact', name: 'Contact', link: '#contact' },
]

// Convert navItems to StaggeredMenu format
const menuItems = navItems.map(item => ({
    label: item.label,
    ariaLabel: `Go to ${item.label.toLowerCase()} ${item.link.startsWith('/') ? 'page' : 'section'}`,
    link: item.link
}))

const socialItems = [
    { label: 'GitHub', link: 'https://github.com/sean6369' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/lee-su-kiat-sean-19211a33b' },
    { label: 'Blog', link: '/blog' }
]

export function Navigation() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const { isModalOpen } = useModal()
    const [activeSection, setActiveSection] = useState('home')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    useEffect(() => {
        // Initialize theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true)
            document.documentElement.classList.add('dark')
        } else {
            setIsDarkMode(false)
            document.documentElement.classList.remove('dark')
        }
    }, [])

    useEffect(() => {
        const navbarOffset = 120 // Account for navbar height
        let ticking = false

        const updateActiveSection = () => {
            const scrollY = window.scrollY || window.pageYOffset || 0

            // If we're at the very top, always show home
            if (scrollY < 50) {
                setActiveSection('home')
                ticking = false
                return
            }

            let activeSection = 'home' // Default to home

            // Check sections in reverse order (from bottom to top)
            // Find the section whose top has passed the navbar offset
            for (let i = navItems.length - 1; i >= 0; i--) {
                const section = navItems[i]
                const element = document.getElementById(section.id)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    const sectionTop = rect.top
                    const sectionBottom = rect.bottom

                    // A section is active if its top is at or above the navbar offset
                    // This means the section has scrolled past the navbar
                    if (sectionTop <= navbarOffset) {
                        activeSection = section.id
                        break
                    }
                }
            }

            setActiveSection(activeSection)
            ticking = false
        }

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveSection)
                ticking = true
            }
        }

        // Initial check with a small delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
            updateActiveSection()
        }, 100)

        // Listen to scroll events with passive for better performance
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(timeoutId)
        }
    }, [])

    const toggleDarkMode = () => {
        const newTheme = !isDarkMode
        setIsDarkMode(newTheme)

        if (newTheme) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    const handleNavClick = (sectionId: string) => {
        // Check if this is an external link (like /blog)
        const navItem = navItems.find(item => item.id === sectionId)
        if (navItem && navItem.link.startsWith('/')) {
            // Navigate to the page
            window.location.href = navItem.link
        } else {
            // Scroll to section
            scrollToSection(sectionId)
        }
    }

    return (
        <motion.div
            animate={{
                y: isModalOpen ? -120 : 0,
                opacity: isModalOpen ? 0 : 1
            }}
            transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
                opacity: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] },
                y: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }
            }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                backgroundColor: 'var(--background)',
                backdropFilter: 'blur(10px)'
            }}
        >
            <Navbar className="fixed top-0">
                {/* Desktop Navigation */}
                <NavBody className="px-6">
                    {/* Logo - Left Side */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-30 cursor-pointer flex items-center"
                        onClick={() => handleNavClick('home')}
                    >
                        <Image
                            src="/logos/sean_logo.svg"
                            alt="Sean logo"
                            className="h-14 w-auto"
                            width={168}
                            height={56}
                            priority
                            style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)' }}
                        />
                    </motion.div>

                    {/* Center - Stepper (Desktop only) */}
                    <div className="absolute inset-0 hidden items-center justify-center lg:flex pointer-events-none">
                        <div className="pointer-events-auto">
                            <Stepper
                                steps={navItems.map((item, index) => ({
                                    id: item.id,
                                    label: item.label,
                                    step: index + 1
                                }))}
                                currentStep={Math.max(1, navItems.findIndex(item => item.id === activeSection) + 1)}
                                onStepClick={handleNavClick}
                            />
                        </div>
                    </div>

                    {/* Right Side - Dark mode toggle only (desktop) */}
                    <div className="relative z-30 flex items-center space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleDarkMode}
                            className="p-2 rounded-lg hover:bg-surface transition-colors duration-200"
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <Sun className="w-5 h-5 text-foreground" />
                            ) : (
                                <Moon className="w-5 h-5 text-foreground" />
                            )}
                        </motion.button>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader className="relative">
                        {/* Logo - Left Side */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative z-30 cursor-pointer flex-shrink-0 ml-6 flex items-center"
                            onClick={() => {
                                handleNavClick('home')
                            }}
                        >
                            <Image
                                src="/logos/sean_logo.svg"
                                alt="Sean logo"
                                className="h-10 w-auto"
                                width={120}
                                height={40}
                                priority
                                style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0)' }}
                            />
                        </motion.div>

                        {/* Center - Current Section Label as Menu Trigger (Mobile only) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[50]">
                            <motion.button
                                key={mobileMenuOpen ? 'close' : activeSection}
                                type="button"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="pointer-events-auto text-lg font-medium text-primary cursor-pointer px-3 py-2 rounded-lg hover:bg-surface active:bg-surface-secondary transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                                onClick={() => setMobileMenuOpen(prev => !prev)}
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileMenuOpen}
                                aria-controls="staggered-menu-panel"
                            >
                                {mobileMenuOpen ? 'Close' : (navItems.find(item => item.id === activeSection)?.label || 'Home')}
                            </motion.button>
                        </div>

                        {/* Right Side - Menu button and Theme toggle */}
                        <div className="relative z-30 flex items-center gap-2 flex-shrink-0">
                            {/* Staggered Menu Button */}
                            <div className="lg:hidden">
                                <StaggeredMenu
                                    position="right"
                                    items={menuItems}
                                    socialItems={socialItems}
                                    displaySocials={true}
                                    displayItemNumbering={true}
                                    menuButtonColor="var(--foreground)"
                                    openMenuButtonColor="var(--foreground)"
                                    changeMenuColorOnOpen={false}
                                    colors={isDarkMode ? ['#1e1e2e', '#313244', '#45475a'] : ['#F0E6DD', '#E6DBD1', '#D4C4B0']}
                                    logoUrl="/src/assets/logos/reactbits-gh-white.svg"
                                    accentColor="var(--primary)"
                                    open={mobileMenuOpen}
                                    onOpenChange={setMobileMenuOpen}
                                    hideDefaultButton={true}
                                    onMenuOpen={() => { }}
                                    onMenuClose={() => { }}
                                    onItemClick={(item) => {
                                        if (item.link.startsWith('/')) {
                                            window.location.href = item.link;
                                        } else {
                                            const sectionId = item.link.replace('#', '');
                                            scrollToSection(sectionId);
                                        }
                                    }}
                                />
                            </div>

                            {/* Theme Toggle */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg hover:bg-surface transition-colors duration-200"
                                aria-label="Toggle dark mode"
                            >
                                {isDarkMode ? (
                                    <Sun className="w-4 h-4 text-foreground" />
                                ) : (
                                    <Moon className="w-4 h-4 text-foreground" />
                                )}
                            </motion.button>
                        </div>
                    </MobileNavHeader>
                </MobileNav>
            </Navbar>
        </motion.div>
    )
}
