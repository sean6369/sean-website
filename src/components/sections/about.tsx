'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export function About() {
    const sectionRef = useRef<HTMLElement>(null)

    // Track scroll progress for this section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start']
    })

    // Transform the section to slide up as it scrolls out of view
    // The section slides up completely as it exits the viewport
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])

    return (
        <motion.section
            ref={sectionRef}
            id="about"
            className="relative z-[2] pt-0 pb-0 mb-0 bg-background-secondary"
            style={{ y }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start mb-0 pb-0">
                {/* Left Column - Header and Text Content */}
                <div className="container-custom pt-8 md:pt-12 lg:pt-16 pb-0 mb-0 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-left mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-clash-display">
                            ABOUT.
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6 lg:pr-8 pb-12 md:pb-16 lg:pb-20 mb-0"
                    >
                        <div className="prose prose-lg max-w-none space-y-8">
                            <p className="text-foreground-secondary leading-relaxed font-medium text-base sm:text-lg">
                                I am a Computer Engineering student at NUS, passionate about building AI-powered solutions that blend functionality with beautiful design. With experience in software development and data analysis, I enjoy exploring how technology can drive meaningful impact. I believe great products balance functionality with design, and I strive to bring both into every project I take on.
                            </p>

                            <p className="text-foreground-secondary leading-relaxed font-medium text-base sm:text-lg">
                                Beyond academics, I love experimenting with new tools, exploring UI/UX concepts, and working on side projects that challenge me to think creatively. I believe impactful products come from the balance of technical precision and thoughtful design, and I'm eager to keep learning, refining my craft, and collaborating with others to bring innovative ideas to life.
                            </p>
                        </div>

                    </motion.div>
                </div>

                {/* Profile Image - Right Half */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative w-full lg:w-[50vw] lg:ml-auto lg:self-start mb-0 pb-0 order-1 lg:order-2"
                >
                    {/* Profile Image */}
                    <div className="relative w-full h-80 sm:h-96 md:h-[28rem] lg:h-full overflow-hidden z-10 mb-0 pb-0">
                        <div className="relative w-full h-[120%] -top-[25%]">
                            <Image
                                src="/images/sean about me.jpg"
                                alt="Sean - About Me"
                                width={384}
                                height={512}
                                className="object-cover w-full h-full object-center"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                                quality={100}
                            />
                        </div>
                        {/* Overlay - Light mode */}
                        <div className="absolute inset-0 bg-[#F2E8DD] mix-blend-multiply dark:hidden" />
                        {/* Overlay - Dark mode */}
                        <div className="absolute inset-0 bg-[#181825] mix-blend-color-dodge hidden dark:block" />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}

