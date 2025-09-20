'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Briefcase, Award, GraduationCap } from 'lucide-react'

const milestones = [
    {
        company: 'Goldjewel Pte. Ltd.',
        role: 'Software Engineer',
        period: 'Jul 2025 – Aug 2025',
        location: 'Singapore',
        description: 'Built and deployed a modern jewelry business website with custom CMS featuring dynamic animations, image cropping tools, and real-time updates optimized for mobile.',
        icon: Briefcase,
        color: 'from-primary to-primary/60'
    },
    {
        company: 'Oxley Pawnshop',
        role: 'Software Engineer',
        period: 'Jun 2025 - Jul 2025',
        location: 'Singapore',
        description: 'Designed and launched a modern pawnshop website as solo developer, featuring interactive animations, integrated contact forms, real-time gold price updates, and complete email system setup.',
        icon: Briefcase,
        color: 'from-secondary to-secondary/60'
    },
    {
        company: 'Yoga Movement',
        role: 'Front Desk & Data Systems Administrator',
        period: 'Dec 2023 - Present',
        location: 'Singapore',
        description: 'Managed database systems for attendance tracking, analyzed participation trends for data-driven decisions, and provided customer service in a supportive environment.',
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
        <section id="milestones" className="section-padding">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Professional <span className="gradient-text">Milestones</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
                    <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
                        A journey of growth, learning, and meaningful contributions across diverse industries
                    </p>
                </motion.div>

                {/* Experience Subheader */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-8 ml-24"
                >
                    <h3 className="text-xl text-foreground text-left font-mono">
                        Experience
                    </h3>
                </motion.div>

                {/* Timeline */}
                <div className="relative w-full max-w-7xl mx-auto">
                    {/* Timeline Line */}
                    <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

                    <div className="space-y-16">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.company}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative flex items-start"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-1/4 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full border-4 border-background z-10" />

                                {/* Date on the left */}
                                <div className="w-1/4 pr-6 text-right">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="text-base text-foreground-secondary font-medium"
                                    >
                                        {milestone.period}
                                    </motion.div>
                                </div>

                                {/* Content on the right */}
                                <div className="w-3/4 pl-6">
                                    {/* Header */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="mb-4"
                                    >
                                        <h3 className="text-xl font-semibold text-primary mb-2">
                                            {milestone.company}
                                        </h3>
                                        <h4 className="text-lg font-medium text-foreground">
                                            {milestone.role}
                                        </h4>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.p
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.1 + 0.1
                                        }}
                                        viewport={{ once: true }}
                                        className="text-foreground-secondary text-base leading-relaxed"
                                    >
                                        {milestone.description}
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education Subheader */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-8 ml-24 mt-16"
                >
                    <h3 className="text-xl text-foreground text-left font-mono">
                        Education
                    </h3>
                </motion.div>

                {/* Education Timeline */}
                <div className="relative w-full max-w-7xl mx-auto">
                    {/* Timeline Line */}
                    <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

                    <div className="space-y-16">
                        {education.map((edu, index) => (
                            <motion.div
                                key={edu.institution}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative flex items-start"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-1/4 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full border-4 border-background z-10" />

                                {/* Date on the left */}
                                <div className="w-1/4 pr-6 text-right">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="text-base text-foreground-secondary font-medium"
                                    >
                                        {edu.period}
                                    </motion.div>
                                </div>

                                {/* Content on the right */}
                                <div className="w-3/4 pl-6">
                                    {/* Header */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="mb-4"
                                    >
                                        <h3 className="text-xl font-semibold text-primary mb-2">
                                            {edu.institution}
                                        </h3>
                                        <h4 className="text-lg font-medium text-foreground">
                                            {edu.degree}
                                        </h4>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
