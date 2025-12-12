'use client';

import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/lib/hooks'
import { scrollToSection } from '@/lib/utils'
import Link from 'next/link'

export function Footer() {
    const currentYear = new Date().getFullYear()
    const { ref: footerRef, isVisible } = useIntersectionObserver()

    return (
        <footer
            ref={footerRef}
            className="relative z-[1] w-full overflow-hidden pt-20 pb-8 bg-background dark:bg-[#12121a]"
        >
            <style jsx global>{`
        .glass {
          backdrop-filter: blur(3px) saturate(180%);
          background: transparent;
          border: 1px solid var(--surface-tertiary);
          justify-content: center;
          align-items: center;
          transition: all .3s;
          display: flex;
          position: relative;
          overflow: hidden;
        }
        .glass:where(.dark, .dark *) {
          display: flex;
          backdrop-filter: blur(2px) !important;
          background: transparent !important;
          border: 1px solid var(--surface-tertiary) !important;
          border-radius: 16px !important;
          justify-content: center !important;
          align-items: center !important;
        }
        .glass::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
        .glass:hover::before {
          left: 100%;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.3); }
          50% { box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.6); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
            {/* Animated floating orbs */}
            <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 select-none">
                <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ backgroundColor: `var(--primary)` }}></div>
                <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full blur-3xl opacity-20" style={{ backgroundColor: `var(--secondary)` }}></div>

                {/* Additional floating orbs with different animations */}
                <div className="absolute top-1/4 left-1/6 h-32 w-32 rounded-full blur-2xl opacity-15 animate-bounce" style={{ backgroundColor: `var(--primary)`, animationDuration: '3s' }}></div>
                <div className="absolute top-3/4 right-1/6 h-40 w-40 rounded-full blur-2xl opacity-15 animate-bounce" style={{ backgroundColor: `var(--secondary)`, animationDuration: '4s' }}></div>
                <div className="absolute top-1/2 left-1/2 h-24 w-24 rounded-full blur-xl opacity-10" style={{ backgroundColor: `var(--primary)` }}></div>
            </div>
            <div className="glass relative mx-auto flex max-w-7xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12">
                <div className={`flex flex-col items-center md:items-start transition-[opacity,transform] duration-700 ease-out delay-200 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}>
                    <a href="#" className="mb-4 flex items-center gap-2">
                        <span className="text-3xl font-semibold tracking-tight" style={{ background: `linear-gradient(to bottom right, var(--primary), var(--secondary))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            Sean
                        </span>
                    </a>
                    <p className="text-foreground mb-6 max-w-xs text-center text-sm md:text-left relative">
                        Student passionate about creating beautiful, functional,
                        and user-friendly digital experiences. Always learning, always building.
                    </p>
                    <div className="mt-2 flex gap-3" style={{ color: `var(--primary)` }}>
                        <a
                            href="https://github.com/sean6369"
                            aria-label="GitHub"
                            className="group relative p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-lg hover:shadow-primary/25"
                            style={{ background: 'transparent' }}
                        >
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <svg className="h-5 w-5 relative z-10 transition-all duration-300 group-hover:drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 .29a12 12 0 00-3.797 23.401c.6.11.82-.26.82-.577v-2.17c-3.338.726-4.042-1.415-4.042-1.415-.546-1.387-1.332-1.756-1.332-1.756-1.09-.744.084-.729.084-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.306 3.495.999.106-.775.418-1.307.76-1.608-2.665-.301-5.466-1.332-5.466-5.933 0-1.31.469-2.381 1.236-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.007-.322 3.301 1.23a11.502 11.502 0 016.002 0c2.292-1.552 3.297-1.23 3.297-1.23.654 1.653.242 2.873.119 3.176.77.841 1.235 1.912 1.235 3.222 0 4.61-2.805 5.629-5.476 5.925.429.369.813 1.096.813 2.211v3.285c0 .32.217.694.825.576A12 12 0 0012 .29"></path>
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/lee-su-kiat-sean-19211a33b"
                            aria-label="LinkedIn"
                            className="group relative p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:-rotate-3 hover:shadow-lg hover:shadow-primary/25"
                            style={{ background: 'transparent' }}
                        >
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <svg className="h-5 w-5 relative z-10 transition-all duration-300 group-hover:drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11 19h-3v-9h3zm-1.5-10.268a1.752 1.752 0 110-3.505 1.752 1.752 0 010 3.505zm15.5 10.268h-3v-4.5c0-1.07-.02-2.450-1.492-2.450-1.495 0-1.725 1.166-1.725 2.372v4.578h-3v-9h2.88v1.23h.04a3.157 3.157 0 012.847-1.568c3.042 0 3.605 2.003 3.605 4.612v4.726z" />
                            </svg>
                        </a>
                        <a
                            href="mailto:seanleesukiat@gmail.com"
                            aria-label="Email"
                            className="group relative p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg hover:shadow-primary/25"
                            style={{ background: 'transparent' }}
                        >
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <svg className="h-5 w-5 relative z-10 transition-all duration-300 group-hover:drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <nav className={`flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left transition-[opacity,transform] duration-700 ease-out delay-400 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                    }`}>
                    <div>
                        <div className="mb-3 text-sm font-semibold tracking-widest uppercase" style={{ color: `var(--primary)` }}>
                            Navigation
                        </div>
                        <ul className="space-y-2">
                            <li className="group">
                                <button
                                    onClick={() => scrollToSection('about')}
                                    className="relative text-foreground/70 hover:text-foreground transition-all duration-300 hover:translate-x-1 hover:scale-105"
                                >
                                    <span className="relative z-10">About</span>
                                    <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></div>
                                </button>
                            </li>
                            <li className="group">
                                <button
                                    onClick={() => scrollToSection('milestones')}
                                    className="relative text-foreground/70 hover:text-foreground transition-all duration-300 hover:translate-x-1 hover:scale-105"
                                >
                                    <span className="relative z-10">Milestones</span>
                                    <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></div>
                                </button>
                            </li>
                            <li className="group">
                                <button
                                    onClick={() => scrollToSection('projects')}
                                    className="relative text-foreground/70 hover:text-foreground transition-all duration-300 hover:translate-x-1 hover:scale-105"
                                >
                                    <span className="relative z-10">Projects</span>
                                    <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></div>
                                </button>
                            </li>
                            <li className="group">
                                <Link
                                    href="/blog"
                                    className="relative text-foreground/70 hover:text-foreground transition-all duration-300 hover:translate-x-1 hover:scale-105"
                                >
                                    <span className="relative z-10">Blog</span>
                                    <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className={`text-foreground relative z-10 mt-10 flex flex-col items-center gap-4 text-center text-xs transition-[opacity,transform] duration-700 ease-out delay-600 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
                }`}>
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                    className="group relative flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-2xl overflow-hidden button-primary"
                    style={{
                        background: `linear-gradient(to bottom right, var(--primary), var(--secondary))`,
                        color: 'var(--background)'
                    }}
                >
                    {/* Text with slide animation */}
                    <span className="group-hover:translate-x-full group-hover:opacity-0 text-center transition-all duration-500 relative z-10">
                        Back to top
                    </span>

                    {/* Icon with slide animation */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 flex items-center justify-center transition-all duration-500 z-20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                        </svg>
                    </div>
                </motion.button>
                <span>&copy; {currentYear} Sean. All rights reserved.</span>
            </div>
        </footer>
    );
}

