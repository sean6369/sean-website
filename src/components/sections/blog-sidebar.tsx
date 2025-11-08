'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, Mail, Github, Linkedin, ChevronDown } from 'lucide-react'

export function BlogSidebar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }
    }, [isDropdownOpen])

    const links = [
        {
            href: '/',
            icon: Globe,
            label: 'Main Website',
            external: false
        },
        {
            href: 'https://github.com/sean6369',
            icon: Github,
            label: 'GitHub',
            external: true
        },
        {
            href: 'https://www.linkedin.com/in/lee-su-kiat-sean-19211a33b/',
            icon: Linkedin,
            label: 'LinkedIn',
            external: true
        },
        {
            href: 'mailto:seanleesukiat@gmail.com',
            icon: Mail,
            label: 'Email',
            external: false
        }
    ]

    return (
        <>
            {/* Mobile Compressed View */}
            <aside className="w-full lg:hidden mb-2 pb-3 transition-[padding,margin] duration-300 ease-in-out">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 transition-[gap] duration-300 ease-in-out">
                        {/* Compact Profile Image */}
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-800 flex-shrink-0 transition-[width,height] duration-300 ease-in-out">
                            <Image
                                src="/images/sean about me.jpg"
                                alt="Profile"
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Name and Bio - Compact */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                                Sean Lee
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-1 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                                Sometimes I say things
                            </p>
                        </div>
                    </div>

                    {/* Dropdown Button */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 border border-gray-300 dark:border-gray-700 rounded-md flex items-center gap-2 transition-colors bg-white dark:bg-gray-800 whitespace-nowrap"
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="true"
                        >
                            Links
                            <ChevronDown 
                                className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 transition-[transform,opacity] duration-200 ease-in-out animate-in fade-in slide-in-from-top-2">
                                <div className="py-2">
                                    {links.map((link) => {
                                        const Icon = link.icon
                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                target={link.external ? '_blank' : undefined}
                                                rel={link.external ? 'noopener noreferrer' : undefined}
                                                className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm group"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                                <span className="transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">{link.label}</span>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Desktop Sidebar View */}
            <aside className="hidden lg:block w-64 flex-shrink-0 transition-[width] duration-300 ease-in-out">
                <div className="sticky top-8 space-y-6">
                    {/* Profile Image */}
                    <div className="flex justify-start">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800 transition-[width,height] duration-300 ease-in-out">
                            <Image
                                src="/images/sean about me.jpg"
                                alt="Profile"
                                width={128}
                                height={128}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Name and Bio */}
                    <div className="text-left">
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                            Sean Lee
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                            Sometimes I say things
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-3">
                        {links.map((link) => {
                            const Icon = link.icon
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    target={link.external ? '_blank' : undefined}
                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 text-sm group"
                                >
                                    <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">{link.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </aside>
        </>
    )
}

