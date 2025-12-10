'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Lazy load heavy components
const Orb = dynamic(() => import('../ui/Orb'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-primary/10 rounded-full animate-pulse" />
})


export function About() {
    return (
        <section id="about" className="section-padding bg-background-secondary">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-6"
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

                    {/* Profile Image with Orb Effect */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex justify-center"
                    >
                        <motion.div
                            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
                        >
                            {/* Profile Image */}
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl z-10">
                                <Image
                                    src="/images/sean about me.jpg"
                                    alt="Sean - About Me"
                                    width={384}
                                    height={384}
                                    className="object-cover w-full h-full"
                                    sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                                    priority
                                    quality={85}
                                />
                            </div>

                            {/* Orb Effect Front */}
                            <div className="absolute -inset-8 rounded-full overflow-visible z-20 flex items-center justify-center">
                                <div className="w-full h-full">
                                    <Orb
                                        hoverIntensity={1.5}
                                        rotateOnHover={true}
                                        hue={0}
                                        forceHoverState={false}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

            </div>
        </section>
    )
}

