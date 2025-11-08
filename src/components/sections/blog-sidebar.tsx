'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Globe, Mail, Github, Linkedin } from 'lucide-react'

export function BlogSidebar() {
    return (
        <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-8 space-y-6">
                {/* Profile Image */}
                <div className="flex justify-center lg:justify-start">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800">
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
                <div className="text-center lg:text-left">
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                        Sean Lee
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        Computer Engineering student building AI-powered solutions.
                    </p>
                </div>

                {/* Links */}
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm group"
                    >
                        <Globe className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span>Main Website</span>
                    </Link>

                    <Link
                        href="https://github.com/sean6369"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm group"
                    >
                        <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span>GitHub</span>
                    </Link>

                    <Link
                        href="https://www.linkedin.com/in/lee-su-kiat-sean-19211a33b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm group"
                    >
                        <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span>LinkedIn</span>
                    </Link>

                    <Link
                        href="mailto:seanleesukiat@gmail.com"
                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors text-sm group"
                    >
                        <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        <span>Email</span>
                    </Link>
                </div>
            </div>
        </aside>
    )
}

