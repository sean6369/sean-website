'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react'
import { cn, scrollToSection } from '@/lib/utils'
import StaggeredMenu from './StaggeredMenu'
import Stepper from './stepper'

const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
]

// Convert navItems to StaggeredMenu format
const menuItems = navItems.map(item => ({
    label: item.label,
    ariaLabel: `Go to ${item.label.toLowerCase()} section`,
    link: `#${item.id}`
}))

const socialItems = [
    { label: 'GitHub', link: 'https://github.com/sean6369' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/lee-su-kiat-sean-19211a33b' }
]

export function Navigation() {
    const [isDarkMode, setIsDarkMode] = useState(false) // Default to light mode
    const [activeSection, setActiveSection] = useState('home')
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)

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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            // Update active section based on scroll position
            const sections = navItems.map(item => item.id)
            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
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
        scrollToSection(sectionId)
    }

    const handleNodeHover = (index: number, isHovering: boolean) => {
        // Animate adjacent edges when hovering over a node
        const edges = document.querySelectorAll('[data-edge]')
        const leftEdge = edges[index - 1] as SVGLineElement
        const rightEdge = edges[index] as SVGLineElement

        if (isHovering) {
            if (leftEdge) {
                leftEdge.style.strokeWidth = '3'
                leftEdge.style.filter = 'drop-shadow(0 0 6px var(--primary))'
            }
            if (rightEdge) {
                rightEdge.style.strokeWidth = '3'
                rightEdge.style.filter = 'drop-shadow(0 0 6px var(--primary))'
            }
        } else {
            if (leftEdge) {
                leftEdge.style.strokeWidth = '2'
                leftEdge.style.filter = (activeSection === navItems[index]?.id)
                    ? 'drop-shadow(0 0 4px var(--primary))'
                    : 'none'
            }
            if (rightEdge) {
                rightEdge.style.strokeWidth = '2'
                rightEdge.style.filter = (activeSection === navItems[index + 1]?.id)
                    ? 'drop-shadow(0 0 4px var(--primary))'
                    : 'none'
            }
        }
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'glass-effect shadow-lg'
                    : 'bg-transparent'
            )}
        >
            <div className="container-custom">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-center h-20 relative">
                    {/* Logo - Positioned Absolutely */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute left-0 text-2xl font-bold gradient-text cursor-pointer"
                        onClick={() => handleNavClick('home')}
                    >
                        Sean
                    </motion.div>

                    {/* Desktop Navigation - True Center Stepper */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Stepper
                            steps={navItems.map((item, index) => ({
                                id: item.id,
                                label: item.label,
                                step: index + 1
                            }))}
                            currentStep={navItems.findIndex(item => item.id === activeSection) + 1}
                            onStepClick={handleNavClick}
                        />
                    </div>

                    {/* Dark mode toggle and staggered menu - Positioned Absolutely */}
                    <div className="absolute right-0 flex items-center space-x-4">
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

                        {/* Staggered Menu */}
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
                            onMenuOpen={() => console.log('Menu opened')}
                            onMenuClose={() => console.log('Menu closed')}
                            onItemClick={(item) => {
                                const sectionId = item.link.replace('#', '');
                                scrollToSection(sectionId);
                            }}
                        />
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    {/* Mobile Header with Stepper and Dropdown Arrow */}
                    <div className="flex items-center justify-center h-16 relative px-4">
                        {/* Centered Mobile Stepper with Right Padding */}
                        <div className="flex items-center justify-center pr-16">
                            <Stepper
                                steps={navItems.map((item, index) => ({
                                    id: item.id,
                                    label: item.label,
                                    step: index + 1
                                }))}
                                currentStep={navItems.findIndex(item => item.id === activeSection) + 1}
                                onStepClick={handleNavClick}
                            />
                        </div>

                        {/* Dropdown Arrow - Positioned Absolutely */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                            className="absolute right-4 p-2 rounded-lg hover:bg-surface transition-colors duration-200"
                            aria-label="Toggle options"
                        >
                            <motion.div
                                animate={{ rotate: isMobileDropdownOpen ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <ChevronDown className="w-5 h-5 text-foreground" />
                            </motion.div>
                        </motion.button>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    <AnimatePresence>
                        {isMobileDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: 0 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="flex items-center justify-between w-full">
                                    {/* Title/Logo */}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-lg font-bold gradient-text cursor-pointer"
                                        onClick={() => {
                                            handleNavClick('home');
                                            setIsMobileDropdownOpen(false);
                                        }}
                                    >
                                        Sean
                                    </motion.div>

                                    {/* Theme Toggle and Staggered Menu */}
                                    <div className="flex items-center space-x-4">
                                        {/* Theme Toggle */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={toggleDarkMode}
                                            className="p-1.5 rounded-lg hover:bg-surface transition-colors duration-200"
                                            aria-label="Toggle dark mode"
                                        >
                                            {isDarkMode ? (
                                                <Sun className="w-4 h-4 text-foreground" />
                                            ) : (
                                                <Moon className="w-4 h-4 text-foreground" />
                                            )}
                                        </motion.button>

                                        {/* Staggered Menu */}
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
                                            onMenuOpen={() => console.log('Menu opened')}
                                            onMenuClose={() => console.log('Menu closed')}
                                            onItemClick={(item) => {
                                                const sectionId = item.link.replace('#', '');
                                                scrollToSection(sectionId);
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </motion.nav>
    )
}

