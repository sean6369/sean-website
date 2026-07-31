'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1]

type TimelineEntry = {
    /** Organisation — company or institution. */
    title: string
    /** Position held — role or qualification. */
    subtitle: string
    period: string
    description?: string
    logo?: { src: string; alt: string }
}

const milestones: TimelineEntry[] = [
    {
        title: 'PSA Singapore',
        subtitle: 'AI Engineer',
        period: 'May 2026 - Aug 2026',
        description:
            'Developed the product operations agent into live use by duty officers, building the SOP and case log ingestion pipeline plus database and log query tools; prototyped a second agent to refresh a 350+ article knowledge base.',
        logo: { src: '/logos/psa.png', alt: 'PSA Singapore logo' }
    },
    {
        title: 'A*STAR Advanced Remanufacturing and Technology Centre',
        subtitle: 'AI Research Engineer',
        period: 'Feb 2026 - May 2026',
        description:
            'Developed and evaluated context-aware, user-centric capabilities within a multi-agent AI platform, focusing on adaptive intelligence and intelligent agent coordination.',
        logo: {
            src: '/logos/astar_logo.png',
            alt: 'A*STAR Advanced Remanufacturing and Technology Centre logo'
        }
    },
    {
        title: 'Goldjewel Pte. Ltd.',
        subtitle: 'Software Engineer',
        period: 'Jun 2025 - Aug 2025',
        description:
            'Built and deployed a modern jewelry business website with custom CMS featuring dynamic animations, image cropping tools, and real-time updates optimized for mobile.',
        logo: { src: '/logos/goldjewelLogo2.png', alt: 'Goldjewel logo' }
    },
    {
        title: 'Oxley Pawnshop',
        subtitle: 'Software Engineer',
        period: 'May 2025 - Jun 2025',
        description:
            'Designed and launched a modern pawnshop website as solo developer, featuring interactive animations, integrated contact forms, real-time gold price updates, and complete email system setup.',
        logo: { src: '/logos/oxleyLogo3.jpg', alt: 'Oxley Pawnshop logo' }
    },
    {
        title: 'Yoga Movement',
        subtitle: 'Front Desk and Data Analyst',
        period: 'Dec 2023 - Present',
        description:
            'Analysed participation trends to improve class scheduling and engagement, and provided customer support while fostering a positive and welcoming environment.',
        logo: { src: '/logos/logo-yoga-movement.png', alt: 'Yoga Movement logo' }
    },
    {
        title: 'Singapore Armed Forces',
        subtitle: 'National Service - Signal Specialist in 10C41 Battalion',
        period: 'Jan 2022 - Nov 2023',
        description:
            'Served as Signal Specialist developing technical expertise in communication systems and demonstrating leadership in high-pressure military environments.',
        logo: { src: '/logos/singapore_army_saf.jpg', alt: 'Singapore Armed Forces logo' }
    }
]

const education: TimelineEntry[] = [
    {
        title: 'National University of Singapore',
        subtitle: 'Bachelor of Engineering in Computer Engineering',
        period: 'Aug 2024 - Present',
        logo: { src: '/logos/nus_logo.jpg', alt: 'NUS logo' }
    },
    {
        title: 'Eunoia Junior College',
        subtitle: 'A-Levels',
        period: 'Jan 2020 - Dec 2021',
        logo: { src: '/logos/eunoia_logo.png', alt: 'Eunoia Junior College logo' }
    },
    {
        title: 'Catholic High School',
        subtitle: 'Integrated Programme',
        period: 'Jan 2016 - Dec 2019',
        logo: { src: '/logos/chs_logo.jpg', alt: 'Catholic High School logo' }
    }
]

const LOGO_BOX =
    'absolute left-0 sm:left-8 md:left-[22%] md:transform md:-translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none bg-inherit z-10 milestone-logo-soft-edges'

/**
 * One row of the timeline. Previously each entry was matched by name against a
 * chain of nine near-identical branches that differed only in image src; the
 * logo now travels with the data instead.
 */
function TimelineRow({
    entry,
    index,
    isLast
}: {
    entry: TimelineEntry
    index: number
    isLast: boolean
}) {
    const delay = index * 0.08

    return (
        <div className="pb-4 sm:pb-6 lg:pb-8">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay, ease: EASE }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row md:items-start pl-20 sm:pl-24 md:pl-0"
            >
                {/* Timeline Dot */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: delay + 0.15, ease: EASE }}
                    viewport={{ once: true }}
                    className={
                        entry.logo
                            ? `${LOGO_BOX} flex items-center justify-center overflow-hidden`
                            : LOGO_BOX
                    }
                >
                    {entry.logo && (
                        <Image
                            src={entry.logo.src}
                            alt={entry.logo.alt}
                            width={96}
                            height={96}
                            className="rounded-none object-cover object-center w-full h-full"
                        />
                    )}
                </motion.div>

                {/* Left Column: Date (paired with logo) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay, ease: EASE }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/4 md:pl-12 md:pr-8 lg:pr-12 mb-3 md:mb-0 md:text-left"
                >
                    <div className="text-sm sm:text-base text-foreground-secondary font-medium">
                        {entry.period}
                    </div>
                </motion.div>

                {/* Right Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay, ease: EASE }}
                    viewport={{ once: true }}
                    className="w-full md:w-3/4 md:pl-20"
                >
                    {/* Header */}
                    <div className="mb-3 sm:mb-4">
                        <h3 className="text-lg sm:text-xl font-bold text-primary leading-snug mb-0.5">
                            {entry.title}
                        </h3>
                        <h4 className="text-base sm:text-lg font-semibold text-foreground leading-snug">
                            {entry.subtitle}
                        </h4>
                    </div>

                    {/* Description */}
                    {entry.description && (
                        <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed font-sans font-medium">
                            {entry.description}
                        </p>
                    )}
                </motion.div>
            </motion.div>

            {!isLast && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: delay + 0.2, ease: EASE }}
                    viewport={{ once: true }}
                    className="mt-4 sm:mt-6 lg:mt-8 md:ml-[calc(25%-3rem)] md:w-[calc(75%+3rem)]"
                >
                    <hr className="milestones-divider" />
                </motion.div>
            )}
        </div>
    )
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
    return (
        <div className="relative w-full max-w-7xl mx-auto">
            <div className="space-y-0">
                {entries.map((entry, index) => (
                    <TimelineRow
                        key={entry.title}
                        entry={entry}
                        index={index}
                        isLast={index === entries.length - 1}
                    />
                ))}
            </div>
        </div>
    )
}

function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className={className}
        >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-left">
                {children}
            </h3>
        </motion.div>
    )
}

export function Milestones() {
    return (
        <section id="milestones" className="relative z-[1] section-padding">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-left mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-clash-display">
                        MILESTONES.
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6" />
                </motion.div>

                <SectionHeading className="mb-8 sm:mb-12 mt-6 sm:mt-8">Experience</SectionHeading>
                <Timeline entries={milestones} />

                <SectionHeading className="mb-8 sm:mb-12 mt-12 sm:mt-20">Education</SectionHeading>
                <Timeline entries={education} />

                {/* Resume Download Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 sm:mt-16 md:mt-20 flex justify-center"
                >
                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: EASE }}
                    >
                        <Button
                            size="lg"
                            asChild
                            className="button-primary transition-all duration-300 group/modal-btn relative overflow-hidden"
                        >
                            <a
                                href="/documents/Sean_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center"
                            >
                                <span className="group-hover/modal-btn:translate-x-full group-hover/modal-btn:opacity-0 text-center transition-all duration-500">
                                    Download Resume
                                </span>
                                <div className="absolute inset-0 -translate-x-full group-hover/modal-btn:translate-x-0 flex items-center justify-center transition-all duration-500 z-20">
                                    <Download className="w-4 h-4" />
                                </div>
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    )
}
