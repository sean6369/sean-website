'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ChevronRight, X, ChevronLeft, ChevronRightIcon } from 'lucide-react'
import { useState, useRef, useEffect, useMemo, memo } from 'react'
import { useIsMobile } from '@/lib/hooks'
import MagicBento from '../ui/MagicBento'

const projectsData = [
    {
        id: 1,
        title: 'SilverSigma',
        description: 'A comprehensive web-app platform for seniors featuring real-time interactive AI avatar companionship, hobby discovery hub, and a safe social media network to enhance mental health, life fulfillment and connectivity.',
        longDescription: 'Part of a team of 5 to build a web-app platform for seniors, featuring real-time interactive AI avatar companionship, hobby discovery hub, and a safe social media network, to enhance mental health, life fulfillment and connectivity. The platform includes an AI-powered companion with HeyGen streaming avatar technology supporting 4 languages (English, Mandarin, Bahasa Melayu, Tamil), a comprehensive hobby hub with 30+ activities across 6 categories, SeniorGram social feed for safe sharing, and community classes integration with 32+ workshop options across Singapore. Built with accessibility-first design featuring WCAG AA+ compliance, mobile-first approach, and voice-first interaction options.',
        image: '/projects/silversigma.jpg',
        technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'HeyGen AI Avatar', 'OpenAI', 'Supabase', 'WebSocket', 'PWA'],
        github: 'https://github.com/Path-yang/SilverSigma',
        live: 'https://silver-sigma.vercel.app',
        hackathon: '@SUTD What the Hack',
        category: 'Web App',
        date: 'Sep 2025',
    },
    {
        id: 2,
        title: 'SentinelAI',
        description: 'An AI-powered system that transforms IP cameras into real-time anomaly detectors for falls, emergencies, and safety hazards, with applications in elderly care, pet monitoring, and industrial safety.',
        longDescription: 'Part of a team of 5 to develop an AI-powered system that transforms IP cameras into real-time anomaly detectors for falls, emergencies, and safety hazards, with applications in elderly care, pet monitoring, and industrial safety. The system features cloud-first architecture with automatic RTSP to HLS conversion, real-time AI processing with WebSocket-based alerts, cross-platform compatibility, and enterprise-grade security with HTTPS encryption. While our project didn\'t advance, we reflected on challenges such as scaling difficulties, limited long-term differentiation, and missing safeguards like background checks, highlighting the importance of focusing on innovative approaches that address the limitations of current offerings and stronger market validation.',
        image: '/projects/sentinelai.jpg',
        technologies: ['Machine Learning', 'Fullstack Development', 'Cloud Architecture', 'Real-time Streaming', 'AI Detection', 'WebSocket', 'RTSP', 'HLS'],
        github: 'https://github.com/Path-yang/SentinelAI',
        live: 'https://sentinel-ai-web-ll3v.vercel.app',
        hackathon: '@IDP IDEATE • @NUS SoC VIP Grant',
        videos: [
            {
                title: 'IDP IDEATE Demo',
                url: '/videos/IDEATE2025_demo.mp4',
                hackathon: '@IDP IDEATE'
            },
            {
                title: 'NUS SoC VIP',
                url: '/videos/VIP@SoC SentinelAI Demo.mp4',
                hackathon: '@NUS SoC VIP Grant'
            }
        ],
        category: 'AI/ML',
        date: 'Aug 2025 - Sep 2025',
    },
    {
        id: 3,
        title: 'Oxley Pawnshop Website',
        description: 'A modern website for a Singapore-based pawnshop designed and launched by a solo developer intern.',
        longDescription: 'A modern website for a Singapore-based pawnshop designed and launched by a solo developer intern. Features an interactive homepage with smooth animations, contact form integrated with company email and automated replies, real-time gold price updates with fallback data sources, and fully configured company email accounts for all team members.',
        image: '/projects/oxleypawnshop.jpg',
        technologies: ['Frontend Development', 'Backend Integration', 'API Integration', 'Email Services', 'Real-time Data'],
        live: 'https://www.oxleypawnshop.com/',
        category: 'Web App',
        date: 'Jul 2025 - Aug 2025',
    },
    {
        id: 4,
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
        date: 'Jul 2025',
    },
    {
        id: 5,
        title: 'Goldjewel Website & CMS',
        description: 'As a solo software engineer intern, I built and deployed a modern website for a jewelry business along with a custom content management system (CMS).',
        longDescription: 'As a solo software engineer intern, I built and deployed a modern website for a jewelry business along with a custom content management system (CMS). The website features a dynamic homepage with fluid animations to showcase products elegantly, while the CMS provides an intuitive interface for the team to manage product listings with ease. The CMS includes built-in image cropping tools and supports instant, real-time updates to the website whenever new products are added or existing ones are modified, ensuring a seamless workflow between product management and customer-facing updates.',
        image: '/projects/goldjewel.jpg',
        technologies: ['Frontend Development', 'CMS Development', 'Database Management', 'Image Processing', 'Real-time Updates'],
        live: 'https://www.goldjewel.sg/',
        cms: 'https://cms.goldjewel.sg/login',
        category: 'Web App',
        date: 'Jun 2025 - Aug 2025',
    },
    {
        id: 6,
        title: 'SigmaShield',
        achievement: '🏆 Finalist (top 20 of 80+ teams)',
        description: 'An AI-powered mobile app that helps users detect, understand, and prevent online scams. It offers real-time URL analysis, educational content, scam analytics, and a community forum for sharing experiences and insights.',
        longDescription: 'An AI-powered mobile app that helps users detect, understand, and prevent online scams. It offers real-time URL analysis, educational content, scam analytics, and a community forum for sharing experiences and insights. Features include scam detection with AI-powered confidence scores, educational modules about different scam types, analytics dashboards for tracking detections, and a community forum for discussion and support.',
        image: '/projects/sigmashield.jpg',
        technologies: ['React Native', 'Expo', 'TypeScript', 'AI/ML', 'Python', 'Node.js'],
        github: 'https://github.com/Path-yang/DSTA-Code-Exp-2025',
        hackathon: '@DSTA Brainhack-Code EXP 2025',
        video: '/videos/SigmaShield demo video.mp4',
        category: 'Mobile App',
        date: 'Jun 2025 - Jul 2025',
    },
    {
        id: 7,
        title: 'GymFit',
        description: 'Built during Orbital 2025, a cross-platform fitness app built with Flutter and Firebase, featuring real-time workout tracking and timers, YouTube video integration, and science-based calorie calculations.',
        longDescription: 'Built during Orbital 2025, a cross-platform fitness app built with Flutter and Firebase, featuring real-time workout tracking and timers, YouTube video integration, and science-based calorie calculations. It includes social networking, workout history tracking and statistics, advanced muscle recovery monitoring, and personalized workout recommendations.',
        image: '/projects/gymfit.jpg',
        technologies: ['Flutter', 'Firebase', 'Dart', 'YouTube API', 'Cross-platform'],
        github: 'https://github.com/WangZX2001/GymFit',
        hackathon: '@Orbital 2025',
        video: '/videos/gymfit video.mp4',
        category: 'Mobile App',
        date: 'May 2025 - Aug 2025',
    },
    {
        id: 8,
        title: 'NoFap',
        description: 'Built during Hackomania 2025, a modern web app designed to help users stay motivated on their NoFap journey through progress tracking, achievements, and community support.',
        longDescription: 'Built during Hackomania 2025, a modern web app designed to help users stay motivated on their NoFap journey through progress tracking, achievements, and community support. It features donation-based support platform enabling micro-donations through the Open Payments API to assist individuals overcoming addiction.',
        image: '/projects/nofap.jpg',
        technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vercel'],
        github: 'https://github.com/Path-yang/Hackomania_2025',
        live: 'https://geekshackinghackathon-8ygu.vercel.app',
        hackathon: '@Hackomania 2025',
        category: 'Web App',
        date: 'Feb 2025',
    },
    {
        id: 9,
        title: 'Ship Vessel Risk Detection Model',
        achievement: '🏆 Top 3',
        description: 'A two-stage AI pipeline to predict vessel deficiency severity from Port State Control inspection text.',
        longDescription: 'A two-stage AI pipeline to predict vessel deficiency severity from Port State Control inspection text. Stage 1 resolves and consolidates multiple annotations into a single severity label per inspection, and Stage 2 fine-tunes a DistilBERT transformer to classify severity and generate predictions for new inspections.',
        image: '/projects/ship-vessel.jpg',
        technologies: ['Python', 'DistilBERT', 'Transformers', 'NLP', 'Machine Learning', 'PyTorch'],
        github: 'https://github.com/Path-yang/Maritime-Hackathon-2025',
        hackathon: '@Maritime Hackathon 2025',
        category: 'AI/ML',
        date: 'Jan 2025',
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

// Helper component for video section
const VideoSection = ({ selectedProject }: { selectedProject: typeof projectsData[0] }): JSX.Element | null => {
    // Check for multiple videos first
    if ('videos' in selectedProject && selectedProject.videos && Array.isArray(selectedProject.videos)) {
        return (
            <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3 text-foreground">Project Demos</h4>
                <div className="space-y-6">
                    {selectedProject.videos.map((video, index) => (
                        <div key={index} className="space-y-2">
                            <h5 className="text-base font-medium text-foreground">{video.title}</h5>
                            <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-surface-secondary bg-black">
                                <video
                                    src={video.url}
                                    className="w-full h-full object-contain"
                                    controls
                                    preload="metadata"
                                    playsInline
                                    webkit-playsinline="true"
                                    title={`${selectedProject.title} - ${video.title}`}
                                    onError={(e) => {
                                    }}
                                    onLoadStart={() => {
                                    }}
                                    onCanPlay={() => {
                                    }}
                                >
                                    <source src={video.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Fallback to single video
    if (!('video' in selectedProject) || !selectedProject.video) {
        return null;
    }

    const videoUrl = selectedProject.video as string;

    return (
        <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3 text-foreground">Project Demo</h4>
            {videoUrl.includes('youtu.be') || videoUrl.includes('youtube.com') ? (
                <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-surface-secondary">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoUrl.split('youtu.be/')[1] || videoUrl.split('youtube.com/watch?v=')[1]?.split('&')[0]}`}
                        className="w-full h-full"
                        title={`${selectedProject.title} Demo Video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    <div className="absolute top-2 right-2">
                        <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-background px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
                        >
                            Watch on YouTube
                        </a>
                    </div>
                </div>
            ) : videoUrl.includes('/videos/') || videoUrl.endsWith('.mp4') || videoUrl.endsWith('.mov') || videoUrl.endsWith('.webm') ? (
                <div className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-surface-secondary bg-black">
                    <video
                        src={videoUrl}
                        className="w-full h-full object-contain"
                        controls
                        preload="metadata"
                        playsInline
                        webkit-playsinline="true"
                        title={`${selectedProject.title} Demo Video`}
                        onError={(e) => {
                        }}
                        onLoadStart={() => {
                        }}
                        onCanPlay={() => {
                        }}
                    >
                        <source src={videoUrl} type="video/mp4" />
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
                            href={videoUrl}
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
    );
};

export const Projects = memo(function Projects() {
    const projects = useMemo(() => projectsData, []);
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
    const isMobile = useIsMobile()


    return (
        <section id="projects" className="section-padding bg-background-secondary">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                            duration: 0.9,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            opacity: { duration: 0.7 },
                            y: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
                            scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
                        }
                    }}
                    viewport={{ once: true, margin: "-100px" }}
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



                {/* Magic Bento Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                            duration: 1.0,
                            delay: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            opacity: { duration: 0.8, delay: 0.3 },
                            y: { duration: 1.0, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                            scale: { duration: 0.7, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }
                        }
                    }}
                    viewport={{ once: true, margin: "-80px" }}
                    className="flex justify-center"
                >
                    <MagicBento
                        textAutoHide={true}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={true}
                        enableMagnetism={true}
                        clickEffect={true}
                        spotlightRadius={300}
                        particleCount={12}
                        projects={projects}
                        onCardClick={(e) => {
                            // Find the project index based on the card clicked
                            const cardElement = e.currentTarget;
                            if (cardElement.parentNode) {
                                const cardIndex = Array.from(cardElement.parentNode.children).indexOf(cardElement);
                                if (projects[cardIndex]) {
                                    setSelectedProject(projects[cardIndex]);
                                }
                            }
                        }}
                    />
                </motion.div>

                {/* Project Modal */}
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }
                        }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.4,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                    scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
                                    opacity: { duration: 0.3 },
                                    y: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
                                }
                            }}
                            exit={{
                                scale: 0.85,
                                opacity: 0,
                                y: 20,
                                transition: {
                                    duration: 0.3,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }
                            }}
                            className="glass-effect p-3 sm:p-6 rounded-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[80vh] overflow-y-auto mx-2 sm:mx-0"
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

                            {'achievement' in selectedProject && selectedProject.achievement && (
                                <div className="mb-4 relative group">
                                    <div
                                        className="overflow-x-auto scrollbar-hide"
                                        ref={(el) => {
                                            if (el) {
                                                const checkScrollability = () => {
                                                    const canScroll = el.scrollWidth > el.clientWidth;
                                                    const leftBtn = el.parentElement?.querySelector('.achievement-left-btn') as HTMLElement;
                                                    const rightBtn = el.parentElement?.querySelector('.achievement-right-btn') as HTMLElement;

                                                    if (canScroll) {
                                                        // Show/hide arrows based on scroll position
                                                        const isAtStart = el.scrollLeft <= 0;
                                                        const isAtEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1;

                                                        if (leftBtn) leftBtn.style.display = isAtStart ? 'none' : 'flex';
                                                        if (rightBtn) rightBtn.style.display = isAtEnd ? 'none' : 'flex';
                                                    } else {
                                                        // Hide both arrows if content fits
                                                        if (leftBtn) leftBtn.style.display = 'none';
                                                        if (rightBtn) rightBtn.style.display = 'none';
                                                    }
                                                };

                                                checkScrollability();
                                                el.addEventListener('scroll', checkScrollability);
                                                window.addEventListener('resize', checkScrollability);
                                            }
                                        }}
                                    >
                                        <span className="text-base font-menlo text-secondary font-semibold whitespace-nowrap">
                                            {selectedProject.achievement}
                                        </span>
                                    </div>
                                    <div
                                        className="achievement-left-btn absolute left-0 -top-2 -bottom-2 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer z-10"
                                        style={{
                                            background: 'linear-gradient(90deg, var(--background) 0%, var(--background) 80%, transparent 100%)'
                                        }}
                                        ref={(el) => {
                                            if (el) {
                                                const handleClick = (e: Event) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    e.stopImmediatePropagation();
                                                    const container = el.parentElement?.querySelector('.overflow-x-auto') as HTMLElement;
                                                    if (container) container.scrollBy({ left: -120, behavior: 'smooth' });
                                                };
                                                el.addEventListener('click', handleClick, true);
                                                el.addEventListener('mousedown', (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    e.stopImmediatePropagation();
                                                }, true);
                                                el.addEventListener('mouseup', (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    e.stopImmediatePropagation();
                                                }, true);

                                                // Add hover effects
                                                const getPrimaryRgb = () => {
                                                    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
                                                    const hexToRgb = (hex: string) => {
                                                        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                                                        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '230, 168, 92';
                                                    };
                                                    return hexToRgb(primaryColor);
                                                };

                                                el.addEventListener('mouseenter', () => {
                                                    const primaryRgb = getPrimaryRgb();
                                                    el.style.background = `linear-gradient(90deg, rgba(${primaryRgb}, 0.2) 0%, rgba(${primaryRgb}, 0.1) 80%, transparent 100%)`;
                                                });
                                                el.addEventListener('mouseleave', () => {
                                                    el.style.background = 'linear-gradient(90deg, var(--background) 0%, var(--background) 80%, transparent 100%)';
                                                });
                                            }
                                        }}
                                    >
                                        <ChevronLeft className="w-4 h-4 text-primary drop-shadow-sm" />
                                    </div>
                                    <div
                                        className="achievement-right-btn absolute right-0 -top-2 -bottom-2 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer z-10"
                                        style={{
                                            background: 'linear-gradient(270deg, var(--background) 0%, var(--background) 80%, transparent 100%)'
                                        }}
                                        ref={(el) => {
                                            if (el) {
                                                const handleClick = (e: Event) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    e.stopImmediatePropagation();
                                                    const container = el.parentElement?.querySelector('.overflow-x-auto') as HTMLElement;
                                                    if (container) container.scrollBy({ left: 120, behavior: 'smooth' });
                                                };
                                                el.addEventListener('click', handleClick, true);
                                                el.addEventListener('mousedown', (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    e.stopImmediatePropagation();
                                                }, true);
                                                el.addEventListener('mouseup', (e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    e.stopImmediatePropagation();
                                                }, true);

                                                // Add hover effects
                                                const getPrimaryRgb = () => {
                                                    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
                                                    const hexToRgb = (hex: string) => {
                                                        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                                                        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '230, 168, 92';
                                                    };
                                                    return hexToRgb(primaryColor);
                                                };

                                                el.addEventListener('mouseenter', () => {
                                                    const primaryRgb = getPrimaryRgb();
                                                    el.style.background = `linear-gradient(270deg, rgba(${primaryRgb}, 0.2) 0%, rgba(${primaryRgb}, 0.1) 80%, transparent 100%)`;
                                                });
                                                el.addEventListener('mouseleave', () => {
                                                    el.style.background = 'linear-gradient(270deg, var(--background) 0%, var(--background) 80%, transparent 100%)';
                                                });
                                            }
                                        }}
                                    >
                                        <ChevronRightIcon className="w-4 h-4 text-primary drop-shadow-sm" />
                                    </div>
                                </div>
                            )}

                            <div className="mb-4 flex justify-between items-center">
                                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                                    {selectedProject.category}
                                </span>
                                {selectedProject.hackathon && (
                                    <span className="text-xs px-2 py-1 bg-secondary border border-secondary rounded-xl text-background whitespace-nowrap font-semibold">
                                        {selectedProject.hackathon}
                                    </span>
                                )}
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
                                            className="text-xs px-2 py-1 rounded-lg text-background whitespace-nowrap bg-primary border border-primary font-semibold"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                {'live' in selectedProject && selectedProject.live && (
                                    <motion.a
                                        href={selectedProject.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-sm px-3 py-2 sm:py-1 bg-primary/10 border border-gray-600 dark:border-primary/20 rounded-lg text-primary whitespace-nowrap font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-background transition-colors duration-200 touch-manipulation"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Live Demo
                                    </motion.a>
                                )}
                                {'github' in selectedProject && selectedProject.github && (
                                    <motion.a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-sm px-3 py-2 sm:py-1 bg-secondary/10 border border-gray-600 dark:border-secondary/20 rounded-lg text-secondary whitespace-nowrap font-medium flex items-center justify-center gap-2 hover:bg-secondary hover:text-background transition-colors duration-200 touch-manipulation"
                                    >
                                        <Github className="w-4 h-4" />
                                        View Code
                                    </motion.a>
                                )}
                                {'cms' in selectedProject && selectedProject.cms && (
                                    <motion.a
                                        href={selectedProject.cms}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-sm px-3 py-2 sm:py-1 bg-secondary/10 border border-gray-600 dark:border-secondary/20 rounded-lg text-secondary whitespace-nowrap font-medium flex items-center justify-center gap-2 hover:bg-secondary hover:text-background transition-colors duration-200 touch-manipulation"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Live Demo (CMS)
                                    </motion.a>
                                )}
                            </div>

                            {/* Live Website Preview */}
                            {'live' in selectedProject && selectedProject.live && (selectedProject.title === 'Oxley Pawnshop Website' || selectedProject.title === 'Goldjewel Website & CMS' || selectedProject.title === 'SilverSigma') && (
                                <div className="mt-6">
                                    <h4 className="text-lg font-semibold mb-3 text-foreground">Live Website Preview</h4>
                                    <div className="relative w-full h-80 sm:h-[500px] rounded-lg overflow-hidden border border-surface-secondary">
                                        <div
                                            className="w-full h-full"
                                            style={{
                                                transform: isMobile ? 'scale(0.5)' : 'scale(1)',
                                                transformOrigin: 'top left',
                                                width: isMobile ? '200%' : '100%',
                                                height: isMobile ? '200%' : '100%'
                                            }}
                                        >
                                            <iframe
                                                src={selectedProject.live}
                                                className="w-full h-full"
                                                title={`${selectedProject.title} Live Preview`}
                                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="absolute top-2 right-2">
                                            <a
                                                href={selectedProject.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-primary text-background px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/60 hover:scale-105 hover:shadow-lg transition-all duration-300"
                                            >
                                                Open in New Tab
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Video Demo */}
                            {(() => {
                                if (selectedProject) {
                                    return <VideoSection selectedProject={selectedProject} /> as React.ReactNode;
                                }
                                return null;
                            })()}

                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    )
});
