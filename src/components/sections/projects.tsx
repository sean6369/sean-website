'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ChevronRight, X, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const projects = [
    {
        id: 1,
        title: 'Goldjewel Website & CMS',
        description: 'As a solo software engineer intern, I built and deployed a modern website for a jewelry business along with a custom content management system (CMS).',
        longDescription: 'As a solo software engineer intern, I built and deployed a modern website for a jewelry business along with a custom content management system (CMS). The website features a dynamic homepage with fluid animations to showcase products elegantly, while the CMS provides an intuitive interface for the team to manage product listings with ease. The CMS includes built-in image cropping tools and supports instant, real-time updates to the website whenever new products are added or existing ones are modified, ensuring a seamless workflow between product management and customer-facing updates.',
        image: '/projects/goldjewel.jpg',
        technologies: ['Frontend Development', 'CMS Development', 'Database Management', 'Image Processing', 'Real-time Updates'],
        live: 'https://www.goldjewel.sg/',
        cms: 'https://cms.goldjewel.sg/login',
        category: 'Web App',
    },
    {
        id: 2,
        title: 'Oxley Pawnshop Website',
        description: 'A modern website for a Singapore-based pawnshop designed and launched by a solo developer intern.',
        longDescription: 'A modern website for a Singapore-based pawnshop designed and launched by a solo developer intern. Features an interactive homepage with smooth animations, contact form integrated with company email and automated replies, real-time gold price updates with fallback data sources, and fully configured company email accounts for all team members.',
        image: '/projects/oxleypawnshop.jpg',
        technologies: ['Frontend Development', 'Backend Integration', 'API Integration', 'Email Services', 'Real-time Data'],
        live: 'https://www.oxleypawnshop.com/',
        category: 'Web App',
    },
    {
        id: 3,
        title: 'SigmaHealth',
        achievement: '🏆 Finalist (top 10 of 60+ teams) • Best Usage of Data Award • Best team for Theme 1 (Health and Wellbeing)',
        description: 'An AI-powered, multilingual React Native app that integrates real-time Singapore health data, GPT-based health guidance, and community reporting to create a crowdsourced public health monitoring and education platform.',
        longDescription: 'An AI-powered, multilingual React Native app that integrates real-time Singapore health data, GPT-based health guidance, and community reporting to create a crowdsourced public health monitoring and education platform. Features include AI health assistant (SigmaBoy), real-time dengue/PSI/COVID data integration, interactive health mapping, gamified health quizzes, community reporting system, and multilingual support for Singapore\'s diverse population.',
        image: '/projects/sigmahealth.jpg',
        technologies: ['React Native', 'Expo', 'Firebase', 'OpenAI GPT', 'TypeScript', 'JavaScript'],
        github: 'https://github.com/clemenong1/SigmaHealth',
        hackathon: '@NUS Lifehack 2025',
        video: '/videos/SigmaHealth demo video.mp4',
        category: 'Mobile App',
    },
    {
        id: 4,
        title: 'SigmaShield',
        achievement: '🏆 Finalist (top 20 of 80+ teams)',
        description: 'An AI-powered mobile app that helps users detect, understand, and prevent online scams. It offers real-time URL analysis, educational content, scam analytics, and a community forum for sharing experiences and insights.',
        longDescription: 'An AI-powered mobile app that helps users detect, understand, and prevent online scams. It offers real-time URL analysis, educational content, scam analytics, and a community forum for sharing experiences and insights. Features include scam detection with AI-powered confidence scores, educational modules about different scam types, analytics dashboards for tracking detections, and a community forum for discussion and support.',
        image: '/projects/sigmashield.jpg',
        technologies: ['React Native', 'Expo', 'TypeScript', 'AI/ML', 'Python', 'Node.js'],
        github: 'https://github.com/Path-yang/DSTA-Code-Exp-2025',
        hackathon: '@DSTA Brainhack-Code EXP 2025',
        video: '/videos/SigmaShield demo video.mp4',
        presentation: '/presentations/sigmashield.pdf',
        category: 'Mobile App',
    },
    {
        id: 5,
        title: 'GymFit',
        description: 'Built during Orbital 2025, a cross-platform fitness app built with Flutter and Firebase, featuring real-time workout tracking and timers, YouTube video integration, and science-based calorie calculations.',
        longDescription: 'Built during Orbital 2025, a cross-platform fitness app built with Flutter and Firebase, featuring real-time workout tracking and timers, YouTube video integration, and science-based calorie calculations. It includes social networking, workout history tracking and statistics, advanced muscle recovery monitoring, and personalized workout recommendations.',
        image: '/projects/gymfit.jpg',
        technologies: ['Flutter', 'Firebase', 'Dart', 'YouTube API', 'Cross-platform'],
        github: 'https://github.com/WangZX2001/GymFit',
        hackathon: '@Orbital 2025',
        video: '/videos/gymfit video.mp4',
        category: 'Mobile App',
    },
    {
        id: 6,
        title: 'NoFap',
        description: 'Built during Hackomania 2025, a modern web app designed to help users stay motivated on their NoFap journey through progress tracking, achievements, and community support.',
        longDescription: 'Built during Hackomania 2025, a modern web app designed to help users stay motivated on their NoFap journey through progress tracking, achievements, and community support. It features donation-based support platform enabling micro-donations through the Open Payments API to assist individuals overcoming addiction.',
        image: '/projects/nofap.jpg',
        technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vercel'],
        github: 'https://github.com/Path-yang/Hackomania_2025',
        live: 'https://geekshackinghackathon-8ygu.vercel.app',
        hackathon: '@Hackomania 2025',
        category: 'Web App',
    },
    {
        id: 7,
        title: 'Ship Vessel Risk Detection Model',
        achievement: '🏆 Top 3',
        description: 'A two-stage AI pipeline to predict vessel deficiency severity from Port State Control inspection text.',
        longDescription: 'A two-stage AI pipeline to predict vessel deficiency severity from Port State Control inspection text. Stage 1 resolves and consolidates multiple annotations into a single severity label per inspection, and Stage 2 fine-tunes a DistilBERT transformer to classify severity and generate predictions for new inspections.',
        image: '/projects/ship-vessel.jpg',
        technologies: ['Python', 'DistilBERT', 'Transformers', 'NLP', 'Machine Learning', 'PyTorch'],
        github: 'https://github.com/Path-yang/Maritime-Hackathon-2025',
        hackathon: '@Maritime Hackathon 2025',
        category: 'AI/ML',
    },
]


// Custom hook for scroll state
function useScrollState() {
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    const updateScrollState = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
        }
    }

    useEffect(() => {
        const element = scrollRef.current
        if (element) {
            updateScrollState()
            element.addEventListener('scroll', updateScrollState)
            window.addEventListener('resize', updateScrollState)
            return () => {
                element.removeEventListener('scroll', updateScrollState)
                window.removeEventListener('resize', updateScrollState)
            }
        }
    }, [])

    return { scrollRef, canScrollLeft, canScrollRight, updateScrollState }
}

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)


    return (
        <section id="projects" className="section-padding bg-background-secondary">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
                    <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
                        A showcase of my recent work and personal projects that demonstrate my skills and passion for development
                    </p>
                </motion.div>



                {/* All Projects Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                >
                    {projects.map((project, index) => {
                        const GridAchievementCard = ({ project }: { project: typeof projects[0] }) => {
                            const { scrollRef, canScrollLeft, canScrollRight, updateScrollState } = useScrollState()

                            return (
                                <>
                                    {project.achievement && (
                                        <div className="mb-2 relative group">
                                            <div
                                                ref={scrollRef}
                                                className="overflow-x-auto scrollbar-hide"
                                                onScroll={updateScrollState}
                                            >
                                                <span className="text-xs font-menlo text-secondary font-semibold whitespace-nowrap">
                                                    {project.achievement}
                                                </span>
                                            </div>
                                            {canScrollLeft && (
                                                <button
                                                    className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background-secondary via-background-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-primary/20 hover:via-primary/10 hover:to-transparent hover:scale-105 active:scale-95"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        if (scrollRef.current) scrollRef.current.scrollBy({ left: -80, behavior: 'smooth' });
                                                    }}
                                                >
                                                    <ChevronLeft className="w-3 h-3 text-primary drop-shadow-sm" />
                                                </button>
                                            )}
                                            {canScrollRight && (
                                                <button
                                                    className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background-secondary via-background-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center hover:bg-gradient-to-l hover:from-primary/20 hover:via-primary/10 hover:to-transparent hover:scale-105 active:scale-95"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        if (scrollRef.current) scrollRef.current.scrollBy({ left: 80, behavior: 'smooth' });
                                                    }}
                                                >
                                                    <ChevronRightIcon className="w-3 h-3 text-primary drop-shadow-sm" />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </>
                            )
                        }

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="glass-effect p-4 sm:p-6 rounded-xl group hover:border-primary/20 transition-all duration-300 cursor-pointer touch-manipulation"
                                onClick={() => setSelectedProject(project)}
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-3 py-1 bg-surface text-foreground-secondary text-xs font-semibold rounded-full">
                                        {project.category}
                                    </span>
                                    {project.hackathon && (
                                        <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">
                                            {project.hackathon}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                                    {project.title}
                                </h3>

                                <GridAchievementCard project={project} />

                                <p className="text-foreground-secondary text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed font-medium">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                                    {project.technologies.slice(0, 2).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-surface text-foreground-secondary text-xs font-menlo rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 2 && (
                                        <span className="px-2 py-1 text-foreground-tertiary text-xs">
                                            +{project.technologies.length - 2}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-foreground-secondary hover:text-primary transition-colors duration-300 p-1 touch-manipulation"
                                                style={{ WebkitTapHighlightColor: 'transparent' }}
                                            >
                                                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </a>
                                        )}
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-foreground-secondary hover:text-primary transition-colors duration-300 p-1 touch-manipulation"
                                                style={{ WebkitTapHighlightColor: 'transparent' }}
                                            >
                                                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </a>
                                        )}
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-foreground-tertiary group-hover:text-primary transition-colors duration-300" />
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Project Modal */}
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-effect p-4 sm:p-6 rounded-xl max-w-2xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg sm:text-2xl font-bold text-foreground">
                                    {selectedProject.title}
                                </h3>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="p-2 hover:bg-surface rounded-lg transition-colors duration-300 touch-manipulation"
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                    <X className="w-5 h-5 text-foreground-secondary" />
                                </button>
                            </div>

                            {selectedProject.achievement && (
                                <div className="mb-4 relative group">
                                    <div className="overflow-x-auto scrollbar-hide">
                                        <span className="text-base font-menlo text-secondary font-semibold whitespace-nowrap">
                                            {selectedProject.achievement}
                                        </span>
                                    </div>
                                    <button
                                        className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-primary/20 hover:via-primary/10 hover:to-transparent hover:scale-105 active:scale-95"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const container = e.currentTarget.parentElement?.querySelector('.overflow-x-auto') as HTMLElement;
                                            if (container) container.scrollBy({ left: -120, behavior: 'smooth' });
                                        }}
                                    >
                                        <ChevronLeft className="w-5 h-5 text-primary drop-shadow-sm" />
                                    </button>
                                    <button
                                        className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center hover:bg-gradient-to-l hover:from-primary/20 hover:via-primary/10 hover:to-transparent hover:scale-105 active:scale-95"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const container = e.currentTarget.parentElement?.querySelector('.overflow-x-auto') as HTMLElement;
                                            if (container) container.scrollBy({ left: 120, behavior: 'smooth' });
                                        }}
                                    >
                                        <ChevronRightIcon className="w-5 h-5 text-primary drop-shadow-sm" />
                                    </button>
                                </div>
                            )}

                            <div className="mb-4">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                                    {selectedProject.category}
                                </span>
                            </div>

                            <p className="text-foreground-secondary mb-6 leading-relaxed font-medium">
                                {selectedProject.longDescription}
                            </p>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-3 text-foreground">Technologies Used</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 bg-surface text-foreground-secondary text-sm font-menlo rounded border border-surface-secondary"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {selectedProject.live && (
                                    <motion.a
                                        href={selectedProject.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="button-primary flex items-center gap-2"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Live Demo
                                    </motion.a>
                                )}
                                {selectedProject.cms && (
                                    <motion.a
                                        href={selectedProject.cms}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="button-secondary flex items-center gap-2"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Live Demo (CMS)
                                    </motion.a>
                                )}
                            </div>

                            {/* Live Website Preview */}
                            {selectedProject.live && (selectedProject.title === 'Oxley Pawnshop Website' || selectedProject.title === 'Goldjewel Website & CMS') && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold mb-3 text-foreground">Live Website Preview</h4>
                                    <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-surface-secondary">
                                        <iframe
                                            src={selectedProject.live}
                                            className="w-full h-full"
                                            title={`${selectedProject.title} Live Preview`}
                                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <a
                                                href={selectedProject.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-primary text-background px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                                            >
                                                Open in New Tab
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Video Demo */}
                            {selectedProject.video && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold mb-3 text-foreground">Project Demo</h4>
                                    {selectedProject.video.includes('youtu.be') || selectedProject.video.includes('youtube.com') ? (
                                        <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-surface-secondary">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${selectedProject.video.split('youtu.be/')[1] || selectedProject.video.split('youtube.com/watch?v=')[1]?.split('&')[0]}`}
                                                className="w-full h-full"
                                                title={`${selectedProject.title} Demo Video`}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                            <div className="absolute top-2 right-2">
                                                <a
                                                    href={selectedProject.video}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-primary text-background px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                                                >
                                                    Watch on YouTube
                                                </a>
                                            </div>
                                        </div>
                                    ) : selectedProject.video.includes('/videos/') || selectedProject.video.endsWith('.mp4') || selectedProject.video.endsWith('.mov') || selectedProject.video.endsWith('.webm') ? (
                                        <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-surface-secondary bg-black">
                                            <video
                                                src={selectedProject.video}
                                                className="w-full h-full object-contain"
                                                controls
                                                preload="metadata"
                                                playsInline
                                                webkit-playsinline="true"
                                                title={`${selectedProject.title} Demo Video`}
                                                onError={(e) => {
                                                    console.error('Video load error:', e);
                                                    console.error('Video src:', selectedProject.video);
                                                }}
                                                onLoadStart={() => {
                                                    console.log('Video loading started:', selectedProject.video);
                                                }}
                                                onCanPlay={() => {
                                                    console.log('Video can play:', selectedProject.video);
                                                }}
                                            >
                                                <source src={selectedProject.video} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    ) : (
                                        <div className="w-full h-96 rounded-lg border border-surface-secondary bg-surface-primary flex flex-col items-center justify-center p-6">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                                                    <ExternalLink className="w-8 h-8 text-primary" />
                                                </div>
                                                <h5 className="text-lg font-semibold mb-2 text-foreground">Project Demo Video</h5>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Watch the demo video to see {selectedProject.title} in action
                                                </p>
                                                <motion.a
                                                    href={selectedProject.video}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Watch Demo Video
                                                </motion.a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Presentation */}
                            {selectedProject.presentation && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold mb-3 text-foreground">Project Presentation</h4>
                                    {selectedProject.presentation.endsWith('.pdf') ? (
                                        <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-surface-secondary">
                                            <iframe
                                                src={`${selectedProject.presentation}#toolbar=1&navpanes=1&scrollbar=1`}
                                                className="w-full h-full"
                                                title={`${selectedProject.title} Presentation`}
                                            />
                                            <div className="absolute top-2 right-2">
                                                <a
                                                    href={selectedProject.presentation}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-primary text-background px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                                                >
                                                    Open in New Tab
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-96 rounded-lg border border-surface-secondary bg-surface-primary flex flex-col items-center justify-center p-6">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                                                    <ExternalLink className="w-8 h-8 text-primary" />
                                                </div>
                                                <h5 className="text-lg font-semibold mb-2 text-foreground">Project Presentation</h5>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    View the presentation deck for {selectedProject.title}
                                                </p>
                                                <motion.a
                                                    href={selectedProject.presentation}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    View Presentation
                                                </motion.a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    )
}
