'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, Award, GraduationCap, Download } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const milestones = [
    {
        company: 'Goldjewel Pte. Ltd.',
        role: 'Software Engineer',
        period: 'Jun 2025 - Aug 2025',
        location: 'Singapore',
        description: 'Built and deployed a modern jewelry business website with custom CMS featuring dynamic animations, image cropping tools, and real-time updates optimized for mobile.',
        icon: Briefcase,
        color: 'from-primary to-primary/60'
    },
    {
        company: 'Oxley Pawnshop',
        role: 'Software Engineer',
        period: 'May 2025 - Jun 2025',
        location: 'Singapore',
        description: 'Designed and launched a modern pawnshop website as solo developer, featuring interactive animations, integrated contact forms, real-time gold price updates, and complete email system setup.',
        icon: Briefcase,
        color: 'from-secondary to-secondary/60'
    },
    {
        company: 'Yoga Movement',
        role: 'Front Desk and Data Analyst',
        period: 'Dec 2023 - Present',
        location: 'Singapore',
        description: 'Analysed participation trends to improve class scheduling and engagement, and provided customer support while fostering a positive and welcoming environment.',
        icon: Award,
        color: 'from-accent to-accent/60'
    },
    {
        company: 'Singapore Armed Forces',
        role: 'National Service – Signal Specialist in 10C41 Battalion',
        period: 'Jan 2022 – Nov 2023',
        location: 'Singapore',
        description: 'Served as Signal Specialist developing technical expertise in communication systems and demonstrating leadership in high-pressure military environments.',
        icon: Award,
        color: 'from-success to-success/60'
    }
]

const education = [
    {
        institution: 'National University of Singapore',
        degree: 'Bachelor of Engineering in Computer Engineering',
        period: 'Aug 2024 - present',
        location: 'Singapore',
        description: 'Pursuing a comprehensive engineering program focused on computer systems, software development, and hardware integration.',
        icon: GraduationCap,
        color: 'from-primary to-primary/60'
    },
    {
        institution: 'Eunoia Junior College',
        degree: 'A-Levels',
        period: 'Jan 2020 - Dec 2021',
        location: 'Singapore',
        description: 'Completed A-Levels with focus on Mathematics, Physics, and Chemistry, building strong foundation for engineering studies.',
        icon: GraduationCap,
        color: 'from-secondary to-secondary/60'
    },
    {
        institution: 'Catholic High School',
        degree: 'Integrated Programme',
        period: 'Jan 2016 – Dec 2019',
        location: 'Singapore',
        description: 'Completed secondary education with strong academic performance, developing critical thinking and problem-solving skills.',
        icon: GraduationCap,
        color: 'from-accent to-accent/60'
    }
]

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

                {/* Experience Subheader */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-8 sm:mb-12 mt-6 sm:mt-8"
                >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-left">
                        Experience
                    </h3>
                </motion.div>

                {/* Timeline */}
                <div className="relative w-full max-w-7xl mx-auto">
                    <div className="space-y-0">
                        {milestones.map((milestone, index) => (
                            <div key={milestone.company} className="pb-4 sm:pb-6 lg:pb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                                viewport={{ once: true }}
                                className="relative flex flex-col md:flex-row md:items-start pl-20 sm:pl-24 md:pl-0"
                            >
                                {/* Timeline Dot */}
                                {milestone.company === 'Oxley Pawnshop' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                        viewport={{ once: true }}
                                        className="absolute left-0 sm:left-8 md:left-[22%] md:transform md:-translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none bg-inherit z-10 milestone-logo-soft-edges flex items-center justify-center overflow-hidden"
                                    >
                                        <Image
                                            src="/logos/oxleyLogo3.jpg"
                                            alt="Oxley Pawnshop Logo"
                                            width={96}
                                            height={96}
                                            className="rounded-none object-cover object-center w-full h-full"
                                        />
                                    </motion.div>
                                ) : milestone.company === 'Goldjewel Pte. Ltd.' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                        viewport={{ once: true }}
                                        className="absolute left-0 sm:left-8 md:left-[22%] md:transform md:-translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none bg-inherit z-10 milestone-logo-soft-edges flex items-center justify-center overflow-hidden"
                                    >
                                        <Image
                                            src="/logos/goldjewelLogo2.png"
                                            alt="Goldjewel Logo"
                                            width={96}
                                            height={96}
                                            className="rounded-none object-cover object-center w-full h-full"
                                        />
                                    </motion.div>
                                ) : milestone.company === 'Yoga Movement' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                        viewport={{ once: true }}
                                        className="absolute left-0 sm:left-8 md:left-[22%] md:transform md:-translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none bg-inherit z-10 milestone-logo-soft-edges flex items-center justify-center overflow-hidden"
                                    >
                                        <Image
                                            src="/logos/logo-yoga-movement.png"
                                            alt="Yoga Movement Logo"
                                            width={96}
                                            height={96}
                                            className="rounded-none object-cover object-center w-full h-full"
                                        />
                                    </motion.div>
                                ) : milestone.company === 'Singapore Armed Forces' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                        viewport={{ once: true }}
                                        className="absolute left-0 sm:left-8 md:left-[22%] md:transform md:-translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none bg-inherit z-10 milestone-logo-soft-edges flex items-center justify-center overflow-hidden"
                                    >
                                        <Image
                                            src="/logos/singapore_army_saf.jpg"
                                            alt="Singapore Armed Forces Logo"
                                            width={96}
                                            height={96}
                                            className="rounded-none object-cover object-center w-full h-full"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                        viewport={{ once: true }}
                                        className="absolute left-0 sm:left-8 md:left-[22%] md:transform md:-translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none bg-inherit z-10 milestone-logo-soft-edges"
                                    />
                                )}

                                {/* Left Column: Date (paired with logo) */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                                    viewport={{ once: true }}
                                    className="w-full md:w-1/4 md:pl-12 md:pr-8 lg:pr-12 mb-3 md:mb-0 md:text-left"
                                >
                                    <div className="text-sm sm:text-base text-foreground-secondary font-medium">
                                        {milestone.period}
                                    </div>
                                </motion.div>

                                {/* Right Column: Content */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                                    viewport={{ once: true }}
                                    className="w-full md:w-3/4 md:pl-20"
                                >
                                    {/* Header */}
                                    <div className="mb-3 sm:mb-4">
                                        <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">
                                            {milestone.company}
                                        </h3>
                                        <h4 className="text-base sm:text-lg font-semibold text-foreground">
                                            {milestone.role}
                                        </h4>
                                    </div>

                                    {/* Description */}
                                    <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed font-sans font-medium">
                                        {milestone.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                            {index < milestones.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.08 + 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                                    viewport={{ once: true }}
                                    className="mt-4 sm:mt-6 lg:mt-8 md:ml-[calc(25%-3rem)] md:w-[calc(75%+3rem)]"
                                >
                                    <hr className="milestones-divider" />
                                </motion.div>
                            )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Education Subheader */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-8 sm:mb-12 mt-12 sm:mt-20"
                >
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-left">
                        Education
                    </h3>
                </motion.div>

                {/* Education Timeline */}
                <div className="relative w-full max-w-7xl mx-auto">
                    <div className="space-y-0">
                        {education.map((edu, index) => (
                            <div key={edu.institution} className="pb-4 sm:pb-6 lg:pb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                                viewport={{ once: true }}
                                className="relative flex flex-col md:flex-row md:items-start pl-20 sm:pl-24 md:pl-0"
                            >
                                {/* Timeline Dot */}
                                {edu.institution === 'National University of Singapore' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                        viewport={{ once: true }}
                                        className="absolute left-0 sm:left-8 md:left-[22%] md:transform md:-translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none bg-inherit z-10 milestone-logo-soft-edges flex items-center justify-center overflow-hidden"
                                    >
                                        <Image
                                            src="/logos/nus_logo.jpg"
                                            alt="NUS Logo"
                                            width={96}
                                            height={96}
                                            className="rounded-none object-cover object-center w-full h-full"
                                        />
                                    </motion.div>
                                ) : edu.institution === 'Eunoia Junior College' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                        viewport={{ once: true }}
                                        className="absolute left-0 sm:left-8 md:left-[22%] md:transform md:-translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none bg-inherit z-10 milestone-logo-soft-edges flex items-center justify-center overflow-hidden"
                                    >
                                        <Image
                                            src="/logos/eunoia_logo.png"
                                            alt="Eunoia Junior College Logo"
                                            width={96}
                                            height={96}
                                            className="rounded-none object-cover object-center w-full h-full"
                                        />
                                    </motion.div>
                                ) : edu.institution === 'Catholic High School' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                        viewport={{ once: true }}
                                        className="absolute left-0 sm:left-8 md:left-[22%] md:transform md:-translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none bg-inherit z-10 milestone-logo-soft-edges flex items-center justify-center overflow-hidden"
                                    >
                                        <Image
                                            src="/logos/chs_logo.jpg"
                                            alt="Catholic High School Logo"
                                            width={96}
                                            height={96}
                                            className="rounded-none object-cover object-center w-full h-full"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.08 + 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                                        viewport={{ once: true }}
                                        className="absolute left-0 sm:left-8 md:left-[22%] md:transform md:-translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-none bg-inherit z-10 milestone-logo-soft-edges"
                                    />
                                )}

                                {/* Left Column: Date (paired with logo) */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                                    viewport={{ once: true }}
                                    className="w-full md:w-1/4 md:pl-12 md:pr-8 lg:pr-12 mb-3 md:mb-0 md:text-left"
                                >
                                    <div className="text-sm sm:text-base text-foreground-secondary font-medium">
                                        {edu.period}
                                    </div>
                                </motion.div>

                                {/* Right Column: Content */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                                    viewport={{ once: true }}
                                    className="w-full md:w-3/4 md:pl-20"
                                >
                                    {/* Header */}
                                    <div className="mb-3 sm:mb-4">
                                        <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">
                                            {edu.institution}
                                        </h3>
                                        <h4 className="text-base sm:text-lg font-semibold text-foreground">
                                            {edu.degree}
                                        </h4>
                                    </div>
                                </motion.div>
                            </motion.div>
                            {index < education.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.08 + 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                                    viewport={{ once: true }}
                                    className="mt-4 sm:mt-6 lg:mt-8 md:ml-[calc(25%-3rem)] md:w-[calc(75%+3rem)]"
                                >
                                    <hr className="milestones-divider" />
                                </motion.div>
                            )}
                            </div>
                        ))}
                    </div>
                </div>

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
                        transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                        <Button
                            size="lg"
                            asChild
                            className="button-primary transition-all duration-300 group/modal-btn relative overflow-hidden"
                        >
                            <a
                                href="/documents/Sean_Resume.pdf"
                                download
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
