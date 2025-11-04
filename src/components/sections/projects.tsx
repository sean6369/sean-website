'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, FileCode, Smartphone, Brain, Trophy, Folder, Globe } from 'lucide-react'
import { useState, useMemo, memo, useEffect, useRef } from 'react'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'
import { useModal } from '@/lib/modal-context'
import { getAnimationVariants } from '@/lib/animations'
import { useSwipeable } from 'react-swipeable'

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
        achievement: '🏆 Finalist (top 10 of 60+ teams) • Best Usage of Data Award',
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



// Animated Logo Component
const AnimatedLogo = () => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 308 312"
        className="animate-logo mx-auto"
        preserveAspectRatio="xMidYMid meet"
    >
        <path
            style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}
            d="m 106.20947,85.790535 c -4.69221,-4.77311 -13.270327,-1.96479 -19,0.0903 -12.85195,4.609586 -40.57945,19.575555 -39.71682,35.909725 0.68914,13.04915 19.5083,12.36388 28.71682,11.96065 29.96233,-1.31201 58.49706,-10.98776 88,-14.96065 -17.19112,17.96234 -34.57462,35.37209 -54,50.99924 -5.22749,4.20537 -14.036487,14.61305 -20.999997,15.09259 -3.527973,0.24295 -6.664913,-2.89015 -8.985333,-5.13504 -3.42229,-3.3109 -7.76126,-7.87224 -9.55248,-12.38117 -1.23603,-3.11139 0.98301,-6.32251 -0.2446,-9.42747 -2.60271,-6.58298 -12.42692,-1.37325 -16.21759,0.8665 -15.52581,9.17355 -32.28656,24.67116 -40.391206,40.98535 -4.6757418,9.412 -5.6732397,21.80975 7.391206,23.6983 27.31912,3.94913 46.7504,-23.5612 70.000003,-30.76544 7.74197,-2.39895 21.553497,1.06714 29.999997,1.06714 18.60347,0 39.21588,-2.3605 57,-8 v 1 c -45.02641,18.74603 -88.760947,46.0853 -130,71.94983 -15.0765,9.45578 -38.7511828,20.62747 -47.0000017,37.05017 6.622519,-1.84055 12.2877027,-7.8515 18.0000007,-11.66666 12.459601,-8.32162 25.152531,-16.18008 38.000001,-23.88427 51.46222,-30.86011 105.66653,-67.05979 163,-84.95061 18.21078,-5.68265 37.0303,-10.31986 54,-19.27933 7.27249,-3.83966 16.00601,-8.29513 17,-17.21913 -12.67789,-2.092 -26.09674,6.38811 -37,11.97223 -16.85338,8.6315 -34.69496,15.57616 -52,23.24614 -31.97359,14.1714 -69.84882,15.24795 -103.999997,13.78163 14.941687,-13.75259 31.568677,-25.63905 45.999997,-40.00076 9.92841,-9.88053 20.03821,-24.72567 32,-31.99384 8.35254,-5.07513 19.81113,-6.42718 29,-9.69752 19.99689,-7.116952 39.71715,-15.013079 58,-25.912035 14.47336,-8.62801 46.34656,-26.26865 40.56635,-47.395844 -6.11561,-22.353027 -39.39084,-5.927948 -50.56635,1.34491 -21.04211,13.693874 -40.81921,31.154484 -57.81558,49.615734 -8.02355,8.715086 -17.70883,25.121815 -29.18518,28.984575 -25.25904,8.5018 -52.7349,11.71436 -78.99924,15.47531 -8.63395,1.23635 -23.86632,2.99636 -30.5625,-3.97763 -5.39794,-5.62189 2.60691,-13.52678 6.52701,-17.34955 C 75.9837,94.392241 90.298283,91.751101 106.20947,85.790565 m 75,22.999995 c 4.07768,-8.75649 12.8347,-15.721709 19.34799,-22.760035 17.16677,-18.5506 36.78171,-36.84723 58.65201,-49.787785 7.86212,-4.651978 29.17426,-16.525391 35.97223,-4.344147 6.42956,11.521062 -11.58487,26.435652 -18.97223,32.432102 -27.02103,21.93342 -61.83853,35.049553 -95,44.459865 m 90,17 c -5.40353,4.00552 -16.716,17.76646 -23.98457,16.18286 -7.45063,-1.62327 -5.30425,-18.77649 -14.97608,-13.84952 -7.06581,3.59943 -9.4078,13.20021 -12.82408,19.6659 -0.98373,1.86184 -3.12027,6.72764 -5.99074,5.65509 -6.66644,-2.49094 2.54235,-19.16602 1.77547,-23.65433 l -7,7 h -1 c -7.39648,-6.42529 -18.23859,1.37282 -23.82947,7.09335 -5.30543,5.42847 -6.78267,13.077 -11.66975,18.42748 -7.59668,8.31698 -25.61135,11.25514 -34.50078,4.47917 5.30096,-1.97647 10.82773,-3.35281 16,-5.66589 3.51271,-1.57093 6.86534,-3.53757 9.99614,-5.77315 5.08542,-3.6313 13.66118,-17.08164 1.0031,-16.33257 -11.71485,0.69326 -21.87847,11.26912 -28.79167,19.81174 -2.77317,3.42679 -6.48772,8.12521 -4.60032,12.85107 2.4531,6.14229 14.15087,4.32348 19.39275,4.06867 8.32025,-0.40445 15.23744,-4.45081 23,-6.66049 11.75998,-3.34758 24.64328,-2.94954 31,-16.29938 h 1 c 1.96346,6.45514 7.98143,10.17386 13.6713,4.72145 6.05949,-5.80661 9.89813,-16.17201 13.3287,-23.72145 4.84027,3.9351 4.83345,12.05429 11.01543,14.39661 9.0896,3.444 31.09486,-12.80753 27.98457,-22.39661 m -72.01543,13.45294 c 5.93611,-0.866 5.45696,5.00035 3.1574,8.54706 -3.30113,5.09146 -11.46277,13.94189 -18.0324,14.45833 -5.11161,0.40182 -3.03036,-5.88321 -1.70602,-8.45833 3.01752,-5.86743 9.62405,-13.53214 16.58102,-14.54706 m 84.01543,3.54706 c -9.8504,13.65506 -38.79546,22.60687 -55,25 v -1 l 55,-24 m -118,3 c -4.17929,7.96738 -14.59077,12.68236 -23,15 3.4507,-8.02861 13.80438,-17.61557 23,-15 m -100,15 -16,21 15.89583,-8.65433 18.10417,15.65433 v 2 c -14.07418,9.49464 -28.70803,19.25835 -45,24.48996 -4.94646,1.58841 -15.60502,3.79312 -18.972221,-1.71835 -3.33665,-5.46146 1.044931,-13.21833 3.987651,-17.77161 7.10315,-10.99075 16.6516,-20.68279 27.02392,-28.62576 4.40975,-3.37693 9.21906,-7.44841 14.96065,-6.37424 z"
            className="logo-path"
        />
    </svg>
)

// Reusable Video Player Component
const VideoPlayer = ({ videoUrl, title, className = "" }: {
    videoUrl: string;
    title: string;
    className?: string;
}) => (
    <div className={`relative w-full rounded-lg overflow-hidden border border-surface-secondary bg-black ${className}`} onClick={(e) => e.stopPropagation()}>
        <video
            src={videoUrl}
            className="w-full h-full object-contain"
            controls
            preload="metadata"
            playsInline
            webkit-playsinline="true"
            title={title}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
        >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
);

// Helper component for preview (hover state)
const PreviewSection = ({ project }: { project: typeof projectsData[0] }): JSX.Element | null => {
    // Check for live website first
    if ('live' in project && project.live && (project.title === 'Oxley Pawnshop Website' || project.title === 'Goldjewel Website & CMS' || project.title === 'SilverSigma')) {
        return (
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-surface-secondary bg-black">
                <div
                    className="w-full h-full"
                    style={{
                        transform: 'scale(0.5)',
                        transformOrigin: 'top left',
                        width: '200%',
                        height: '200%'
                    }}
                >
                    <iframe
                        src={project.live}
                        className="w-full h-full"
                        title={`${project.title} Live Preview`}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        loading="lazy"
                    />
                </div>
                {/* Open in New Tab Button */}
                <div className="absolute top-2 right-2 z-10">
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-surface dark:bg-surface-secondary hover:bg-transparent dark:hover:bg-transparent text-foreground border border-surface-secondary dark:border-surface-tertiary px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 shadow-lg backdrop-blur-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open in New Tab
                    </a>
                </div>
            </div>
        );
    }

    // Check for projects with background images (NoFap and Ship Vessel)
    if (project.title === 'NoFap' || project.title === 'Ship Vessel Risk Detection Model') {
        const backgroundImage = project.title === 'NoFap'
            ? "url('/images/Hackomania screen.png')"
            : "url('/images/Marinetime Hackathon screen.jpeg')";

        return (
            <div className="w-full h-full rounded-lg overflow-hidden border border-surface-secondary bg-black">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage }}
                />
            </div>
        );
    }

    // Check for video demo
    if ('video' in project && project.video) {
        const videoUrl = project.video as string;
        if (videoUrl.includes('/videos/') || videoUrl.endsWith('.mp4') || videoUrl.endsWith('.mov') || videoUrl.endsWith('.webm')) {
            return <VideoPlayer videoUrl={videoUrl} title={`${project.title} Demo Video`} className="w-full h-full" />;
        }
    }

    // Check for multiple videos
    if ('videos' in project && project.videos && Array.isArray(project.videos) && project.videos.length > 0) {
        return <VideoPlayer videoUrl={project.videos[0].url} title={`${project.title} Demo Video`} className="w-full h-full" />;
    }

    // Fallback to project image or description
    return (
        <div className="w-full h-full rounded-lg border border-surface-secondary bg-surface flex items-center justify-center p-6">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <ExternalLink className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">{project.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                </p>
            </div>
        </div>
    );
};

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
                            <VideoPlayer
                                videoUrl={video.url}
                                title={`${selectedProject.title} - ${video.title}`}
                                className="w-full h-64 sm:h-96"
                            />
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
                <VideoPlayer
                    videoUrl={videoUrl}
                    title={`${selectedProject.title} Demo Video`}
                    className="w-full h-64 sm:h-96"
                />
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
    const { setIsModalOpen } = useModal()


    // Consolidated state management
    const [projectState, setProjectState] = useState({
        selectedProject: null as typeof projects[0] | null,
        hoveredProject: null as typeof projects[0] | null,
        hoverTimeout: null as NodeJS.Timeout | null,
        previewRect: null as DOMRect | null,
    });

    // Story cards state for mobile
    const [storyState, setStoryState] = useState({
        currentCardIndex: 0, // 0 = logo, 1+ = projects
        isStoryMode: false,
        swipeDirection: 'left' as 'left' | 'right', // Track swipe direction for animation
    });

    const previewRef = useRef<HTMLDivElement>(null)
    const storyContainerRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()
    const prefersReducedMotion = useReducedMotion()
    const animations = getAnimationVariants(prefersReducedMotion) as any

    // Destructure for easier access
    const { selectedProject, hoveredProject, hoverTimeout, previewRect } = projectState;

    // Project background images mapping
    const projectBackgrounds: Record<number, string> = {
        1: '/images/What the Hack screen.png',
        2: '/images/IDEATE screen.png',
        3: '/images/Oxley Pawnshop screen.jpeg',
        4: '/images/Lifehack screen.jpeg',
        5: '/images/Goldjewel screen.jpg',
        6: '/images/DSTA Brainhack screen.png',
        7: '/images/Orbital screen.png',
        8: '/images/Hackomania screen.png',
        9: '/images/Marinetime Hackathon screen.jpeg',
    };

    // Get active project ID - include story card project for mobile
    const currentStoryProject = isMobile && storyState.currentCardIndex > 0
        ? projects[storyState.currentCardIndex - 1]
        : null;
    const activeProjectId = hoveredProject?.id || selectedProject?.id || currentStoryProject?.id;
    const backgroundImage = activeProjectId ? projectBackgrounds[activeProjectId] : null;


    const handleMouseEnter = (project: typeof projects[0]) => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            setProjectState(prev => ({ ...prev, hoverTimeout: null }))
        }
        // Immediately set hover state for fast cursor movement
        setProjectState(prev => ({ ...prev, hoveredProject: project }))
    }

    const handleMouseLeave = () => {
        // Reduced delay for faster response, especially for file explorer items
        const timeout = setTimeout(() => {
            setProjectState(prev => ({ ...prev, hoveredProject: null }))
        }, 50) // Reduced from 150ms to 50ms for faster response
        setProjectState(prev => ({ ...prev, hoverTimeout: timeout }))
    }

    const handleFileItemMouseEnter = (project: typeof projects[0]) => {
        // Immediate hover for file explorer items - no delay
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            setProjectState(prev => ({ ...prev, hoverTimeout: null }))
        }
        // Immediately set hover state to show preview
        setProjectState(prev => ({ ...prev, hoveredProject: project }))
    }

    const handleFileItemMouseLeave = (e: React.MouseEvent) => {
        // Check if mouse is moving to another file item (relatedTarget check)
        const relatedTarget = e.relatedTarget as HTMLElement
        const isMovingToAnotherItem = relatedTarget?.closest('[data-file-item]')

        // Only set timeout if not moving to another item
        if (!isMovingToAnotherItem) {
            // Longer delay to allow for fast cursor movement - preview will persist longer
            const timeout = setTimeout(() => {
                setProjectState(prev => ({ ...prev, hoveredProject: null }))
            }, 200) // Increased delay to keep preview visible when stopping
            setProjectState(prev => ({ ...prev, hoverTimeout: timeout }))
        } else {
            // Clear any pending timeout when moving to another item
            if (hoverTimeout) {
                clearTimeout(hoverTimeout)
                setProjectState(prev => ({ ...prev, hoverTimeout: null }))
            }
        }
    }

    const handleFileExplorerMouseEnter = () => {
        // Clear timeout when entering the file explorer container
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            setProjectState(prev => ({ ...prev, hoverTimeout: null }))
        }
    }

    const handleFileExplorerMouseLeave = () => {
        // Only clear hover when leaving the entire explorer area
        const timeout = setTimeout(() => {
            setProjectState(prev => ({ ...prev, hoveredProject: null }))
        }, 200) // Delay to allow re-entry if cursor bounces
        setProjectState(prev => ({ ...prev, hoverTimeout: timeout }))
    }

    const handlePreviewMouseEnter = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            setProjectState(prev => ({ ...prev, hoverTimeout: null }))
        }
    }

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout)
            }
        }
    }, [hoverTimeout])

    // Reset preview rect when overlay closes
    useEffect(() => {
        if (!selectedProject) {
            setProjectState(prev => ({ ...prev, previewRect: null }))
        }
    }, [selectedProject])

    // Story cards handlers
    const totalCards = 1 + projects.length // Logo + projects

    // Configure react-swipeable for story container
    const swipeHandlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            // Swipe left - go to next card
            // Prevent swipe if interacting with buttons, videos, links, or iframes
            const target = eventData.event?.target as HTMLElement
            if (target?.closest('button') || target?.closest('video') || target?.closest('a') || target?.closest('iframe')) {
                return
            }
            setStoryState(prev => ({
                ...prev,
                currentCardIndex: Math.min(totalCards - 1, prev.currentCardIndex + 1),
                swipeDirection: 'left',
            }))
        },
        onSwipedRight: (eventData) => {
            // Swipe right - go to previous card
            // Prevent swipe if interacting with buttons, videos, links, or iframes
            const target = eventData.event?.target as HTMLElement
            if (target?.closest('button') || target?.closest('video') || target?.closest('a') || target?.closest('iframe')) {
                return
            }
            setStoryState(prev => ({
                ...prev,
                currentCardIndex: Math.max(0, prev.currentCardIndex - 1),
                swipeDirection: 'right',
            }))
        },
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
        trackMouse: false, // Only track touch, not mouse
        delta: 10, // Minimum distance for swipe
    })

    const handleStoryCardClick = () => {
        // Only open modal if it's a project card (not logo)
        if (storyState.currentCardIndex > 0) {
            const project = projects[storyState.currentCardIndex - 1]
            if (previewRef.current) {
                const rect = previewRef.current.getBoundingClientRect()
                setProjectState(prev => ({ ...prev, previewRect: rect }))
            }
            setProjectState(prev => ({ ...prev, selectedProject: project, hoveredProject: null }))
            setIsModalOpen(true)
        }
    }

    const handleExitStoryMode = () => {
        setStoryState(prev => ({ ...prev, isStoryMode: false, currentCardIndex: 0 }))
    }

    // Story card component for logo
    const LogoStoryCard = () => (
        <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center flex flex-col items-center justify-center px-4">
                <div className="mb-6 sm:mb-8 text-primary flex justify-center">
                    <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96">
                        <AnimatedLogo />
                    </div>
                </div>
                <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-foreground">Select a Project</h3>
                <p className="text-sm lg:text-base text-muted-foreground">
                    Swipe to browse projects
                </p>
            </div>
        </div>
    )

    // Story card component for projects - matches desktop hover preview exactly
    const ProjectStoryCard = ({ project }: { project: typeof projects[0] }) => {
        const cardTouchStartRef = useRef({ x: 0, y: 0, time: 0 })

        const handleCardClick = (e: React.MouseEvent) => {
            // Don't handle click if it's on interactive elements
            const target = e.target as HTMLElement
            if (target.closest('button') || target.closest('video') || target.closest('a') || target.closest('iframe') || target.tagName === 'VIDEO' || target.tagName === 'A' || target.tagName === 'BUTTON') {
                return
            }
            // For mouse clicks (desktop), open modal
            e.stopPropagation()
            handleStoryCardClick()
        }

        const handleCardTouchStart = (e: React.TouchEvent) => {
            // Don't track if it's on interactive elements
            const target = e.target as HTMLElement
            if (target.closest('button') || target.closest('video') || target.closest('a') || target.closest('iframe') || target.tagName === 'VIDEO' || target.tagName === 'A' || target.tagName === 'BUTTON') {
                return
            }
            // Track touch for tap detection
            const touch = e.touches[0]
            cardTouchStartRef.current = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            }
            // Don't stop propagation - let container track too
        }

        const handleCardTouchEnd = (e: React.TouchEvent) => {
            // Don't handle if it's on interactive elements
            const target = e.target as HTMLElement
            if (target.closest('button') || target.closest('video') || target.closest('a') || target.closest('iframe') || target.tagName === 'VIDEO' || target.tagName === 'A' || target.tagName === 'BUTTON') {
                return
            }

            const touch = e.changedTouches[0]
            const deltaX = touch.clientX - cardTouchStartRef.current.x
            const deltaY = touch.clientY - cardTouchStartRef.current.y
            const deltaTime = Date.now() - cardTouchStartRef.current.time
            const absDeltaX = Math.abs(deltaX)
            const absDeltaY = Math.abs(deltaY)

            // If it's a significant movement or long press, don't treat as tap
            // react-swipeable handles swipe detection, so we just check for small movements here
            if (absDeltaX > 30 || absDeltaY > 30 || deltaTime > 400) {
                return // Let event bubble - swipe was likely detected by react-swipeable
            }

            // Small movement and short time = tap - open modal
            e.preventDefault()
            e.stopPropagation()
            handleStoryCardClick()
        }

        return (
            <div
                className="story-card-content backdrop-blur-md border border-surface/50 bg-background pt-14 sm:pt-16 px-4 sm:px-6 pb-4 sm:pb-6 rounded-xl h-full flex flex-col relative cursor-pointer"
                onClick={handleCardClick}
                onTouchStart={handleCardTouchStart}
                onTouchEnd={handleCardTouchEnd}
            >
                {/* Header - matches desktop */}
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground pr-2">
                        {project.title}
                    </h3>
                    <span className="text-xs sm:text-sm font-semibold text-muted-foreground flex-shrink-0">{project.date}</span>
                </div>

                {/* Achievement - matches desktop */}
                {'achievement' in project && project.achievement && (
                    <div className="mb-3">
                        <div className="overflow-hidden">
                            <span className="text-xs sm:text-sm font-menlo text-secondary font-semibold line-clamp-2 block">
                                {project.achievement}
                            </span>
                        </div>
                    </div>
                )}

                {/* Preview Content - matches desktop */}
                <div className="flex-1 min-h-0" ref={previewRef}>
                    <PreviewSection project={project} />
                </div>

                {/* Tap hint at bottom */}
                <div className="mt-3 text-center">
                    <span className="text-xs text-muted-foreground">Tap to view full details</span>
                </div>
            </div>
        )
    }

    // Progress bar component
    const ProgressBar = () => {
        const progress = ((storyState.currentCardIndex + 1) / totalCards) * 100

        return (
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-40">
                <motion.div
                    className="h-full bg-white"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
            </div>
        )
    }

    // Progress indicators (dots)
    const ProgressIndicators = () => (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-1.5 pointer-events-auto">
            {Array.from({ length: totalCards }).map((_, index) => (
                <button
                    key={index}
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setStoryState(prev => ({
                            ...prev,
                            currentCardIndex: index,
                            swipeDirection: index > prev.currentCardIndex ? 'left' : 'right'
                        }))
                    }}
                    onTouchEnd={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setStoryState(prev => ({
                            ...prev,
                            currentCardIndex: index,
                            swipeDirection: index > prev.currentCardIndex ? 'left' : 'right'
                        }))
                    }}
                    className={`rounded-full touch-manipulation ${index === storyState.currentCardIndex
                            ? 'bg-white'
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                    style={index === storyState.currentCardIndex 
                        ? { width: '24px', height: '6px', transition: 'width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }
                        : { width: '6px', height: '6px', transition: 'width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }
                    }
                    aria-label={`Go to card ${index + 1}`}
                />
            ))}
        </div>
    )

    return (
        <section id="projects" className="section-padding bg-background-secondary relative">
            {/* Project Background Effects */}
            <AnimatePresence>
                {backgroundImage ? (
                    <motion.div
                        key={`background-image-${activeProjectId}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.1 : 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute inset-0 z-0"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-sm"
                            style={{ backgroundImage: `url('${backgroundImage}')` }}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div className="container-custom relative z-10">
                {/* Mobile Story Cards */}
                {isMobile ? (
                    <div className="lg:hidden">
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
                            className="text-center mb-8"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Featured <span className="gradient-text">Projects</span>
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4" />
                            <p className="text-sm text-foreground-secondary max-w-xl mx-auto">
                                A showcase of my recent work and personal projects
                            </p>
                        </motion.div>

                        {/* Story Cards Container */}
                        <div
                            ref={(node) => {
                                storyContainerRef.current = node
                                if (swipeHandlers.ref) {
                                    swipeHandlers.ref(node)
                                }
                            }}
                            className="relative h-[80vh] max-h-[600px] rounded-xl overflow-hidden border border-surface-secondary bg-background"
                            {...swipeHandlers}
                        >
                            <ProgressBar />
                            <ProgressIndicators />

                            {/* Close Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleExitStoryMode()
                                }}
                                className="absolute top-4 right-4 z-40 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                                aria-label="Close story mode"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Card Counter */}
                            <div className="absolute top-4 left-4 z-40 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-semibold">
                                {storyState.currentCardIndex + 1} / {totalCards}
                            </div>

                            {/* Story Cards */}
                            <AnimatePresence mode="wait" custom={storyState.swipeDirection}>
                                {storyState.currentCardIndex === 0 ? (
                                    <motion.div
                                        key="logo"
                                        custom={storyState.swipeDirection}
                                        initial={{ opacity: 0, x: storyState.swipeDirection === 'left' ? 100 : -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: storyState.swipeDirection === 'left' ? -100 : 100 }}
                                        transition={{ 
                                            duration: 0.35, 
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            opacity: { duration: 0.25 }
                                        }}
                                        className="absolute inset-0 p-4"
                                    >
                                        <LogoStoryCard />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={projects[storyState.currentCardIndex - 1].id}
                                        custom={storyState.swipeDirection}
                                        initial={{ opacity: 0, x: storyState.swipeDirection === 'left' ? 100 : -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: storyState.swipeDirection === 'left' ? -100 : 100 }}
                                        transition={{ 
                                            duration: 0.35, 
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            opacity: { duration: 0.25 }
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <ProjectStoryCard project={projects[storyState.currentCardIndex - 1]} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Desktop Layout */}
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

                        {/* Desktop Split Layout */}
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
                            className="grid grid-cols-1 lg:grid-cols-[25%_1fr] gap-6 lg:gap-8"
                        >
                            {/* Left Column - File Explorer & Legend */}
                            <div className="flex flex-col">
                                {/* VS Code Style File Explorer */}
                                <div
                                    className="flex flex-col h-[500px] lg:h-[600px] border border-surface-secondary/50 rounded-lg overflow-hidden bg-background/50 backdrop-blur-sm"
                                    onMouseEnter={handleFileExplorerMouseEnter}
                                    onMouseLeave={handleFileExplorerMouseLeave}
                                >
                                    {/* Explorer Header */}
                                    <div className="flex items-center gap-2 px-3 py-2 border-b border-surface-secondary/50 bg-surface/30">
                                        <Folder className="w-4 h-4 text-muted-foreground" />
                                        <span className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary">
                                            Explorer
                                        </span>
                                    </div>

                                    {/* File List */}
                                    <div className="flex-1 overflow-y-auto space-y-0.5 p-1">
                                        {projects.map((project, index) => {
                                            const isSelected = selectedProject?.id === project.id
                                            const isHovered = hoveredProject?.id === project.id
                                            const shouldBlur = (selectedProject && !isSelected) || (hoveredProject && !isHovered && !isSelected)

                                            // Get icon based on category
                                            const getCategoryIcon = () => {
                                                switch (project.category) {
                                                    case 'Web App':
                                                        return Globe
                                                    case 'Mobile App':
                                                        return Smartphone
                                                    case 'AI/ML':
                                                        return Brain
                                                    default:
                                                        return Globe
                                                }
                                            }
                                            const IconComponent = getCategoryIcon()

                                            return (
                                                <motion.div
                                                    key={project.id}
                                                    data-file-item
                                                    initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                        filter: "blur(0px)",
                                                        transition: {
                                                            duration: 0.7,
                                                            ease: [0.16, 1, 0.3, 1]
                                                        }
                                                    }}
                                                    className={`
                                        relative cursor-pointer transition-all duration-200
                                        ${shouldBlur ? 'opacity-40' : 'opacity-100'}
                                    `}
                                                    onMouseEnter={() => handleFileItemMouseEnter(project)}
                                                    onMouseLeave={(e) => handleFileItemMouseLeave(e)}
                                                    onClick={() => {
                                                        // Capture the preview element position for smooth transition
                                                        if (previewRef.current) {
                                                            const rect = previewRef.current.getBoundingClientRect()
                                                            setProjectState(prev => ({ ...prev, previewRect: rect }))
                                                        }
                                                        setProjectState(prev => ({ ...prev, selectedProject: project, hoveredProject: null }))
                                                        setIsModalOpen(true)
                                                    }}
                                                >
                                                    {/* Hover/Selected Indicator Bar */}
                                                    {(isSelected || isHovered) && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scaleX: 0 }}
                                                            animate={{ opacity: 1, scaleX: 1 }}
                                                            exit={{ opacity: 0, scaleX: 0 }}
                                                            transition={{ duration: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                            className={`
                                                    absolute left-0 top-0 bottom-0 w-0.5 rounded-r
                                                    ${isSelected ? 'bg-primary' : 'bg-primary/60'}
                                                `}
                                                        />
                                                    )}

                                                    <div className={`
                                            flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-100 relative
                                            ${isSelected
                                                            ? 'bg-primary/20 dark:bg-primary/10'
                                                            : isHovered
                                                                ? 'bg-surface-secondary dark:bg-surface-secondary/40'
                                                                : ''
                                                        }
                                            hover:bg-surface-secondary dark:hover:bg-surface-secondary/40
                                        `}>
                                                        {/* File Icon */}
                                                        <IconComponent
                                                            className={`
                                                    w-4 h-4 flex-shrink-0 transition-colors duration-150
                                                    ${isSelected
                                                                    ? 'text-primary'
                                                                    : isHovered
                                                                        ? 'text-foreground-secondary'
                                                                        : 'text-muted-foreground'
                                                                }
                                                `}
                                                        />

                                                        {/* Project Title */}
                                                        <span className={`
                                                text-sm truncate flex-1 transition-colors duration-150
                                                ${isSelected
                                                                ? 'text-foreground font-medium'
                                                                : isHovered
                                                                    ? 'text-foreground'
                                                                    : 'text-foreground-secondary'
                                                            }
                                            `}>
                                                            {project.title}
                                                        </span>

                                                        {/* Achievement Indicator */}
                                                        {'achievement' in project && project.achievement && (
                                                            <Trophy
                                                                className={`
                                                        w-3.5 h-3.5 flex-shrink-0 transition-colors duration-150
                                                        ${isSelected
                                                                        ? 'text-primary'
                                                                        : isHovered
                                                                            ? 'text-foreground-secondary'
                                                                            : 'text-muted-foreground'
                                                                    }
                                                    `}
                                                            />
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Icon Legend */}
                                <div className="mt-3 px-3 py-2 rounded-lg border border-surface-secondary/50 bg-surface/30 backdrop-blur-sm">
                                    <div className="flex flex-wrap gap-3 text-xs">
                                        <div className="flex items-center gap-1.5">
                                            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                                            <span className="text-foreground-secondary">Web App</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Smartphone className="w-3.5 h-3.5 text-muted-foreground" />
                                            <span className="text-foreground-secondary">Mobile App</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Brain className="w-3.5 h-3.5 text-muted-foreground" />
                                            <span className="text-foreground-secondary">AI/ML</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Trophy className="w-3.5 h-3.5 text-muted-foreground" />
                                            <span className="text-foreground-secondary">Award Winner</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded View - Only Hover Previews */}
                            <div className="h-[500px] lg:h-[600px]">
                                <AnimatePresence mode="wait">
                                    {hoveredProject ? (
                                        <motion.div
                                            key={hoveredProject.id}
                                            initial={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.98
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.98,
                                                transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
                                            }}
                                            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            className="h-full"
                                            onMouseEnter={handlePreviewMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <div className="backdrop-blur-md border border-surface/50 bg-background p-6 rounded-xl h-full flex flex-col">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h3 className="text-2xl font-bold text-foreground">
                                                        {hoveredProject.title}
                                                    </h3>
                                                    <span className="text-sm font-semibold text-muted-foreground">{hoveredProject.date}</span>
                                                </div>

                                                {'achievement' in hoveredProject && hoveredProject.achievement && (
                                                    <div className="mb-3">
                                                        <div className="overflow-hidden">
                                                            <span className="text-sm font-menlo text-secondary font-semibold line-clamp-2 block">
                                                                {hoveredProject.achievement}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex-1 min-h-0" ref={previewRef}>
                                                    <PreviewSection project={hoveredProject} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            className="flex items-center justify-center h-full min-h-[400px] lg:min-h-[600px]"
                                        >
                                            <div className="text-center flex flex-col items-center justify-center">
                                                <div className="mb-8 text-primary flex justify-center">
                                                    <AnimatedLogo />
                                                </div>
                                                <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-foreground">Select a Project</h3>
                                                <p className="text-sm lg:text-base text-muted-foreground">
                                                    Choose a project to see a preview, or click for full details
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </>
                )}

                {/* Full-Screen Project Overlay - Works for both mobile and desktop */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    duration: 0.5,
                                    delay: 0.2,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                    delay: 0.8,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }
                            }}
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] overflow-y-auto p-4 sm:p-6 lg:p-8"
                            onClick={() => {
                                setProjectState(prev => ({ ...prev, selectedProject: null }))
                                setIsModalOpen(false)
                            }}
                        >
                            <motion.div
                                initial={{
                                    clipPath: "inset(20% 50% 20% 50%)",
                                    opacity: 0,
                                }}
                                animate={{
                                    clipPath: "inset(0% 0% 0% 0%)",
                                    opacity: 1,
                                    transition: {
                                        duration: 0.6,
                                        delay: 0.2,
                                        ease: [0.4, 0.0, 0.2, 1]
                                    }
                                }}
                                exit={{
                                    clipPath: "inset(20% 50% 20% 50%)",
                                    opacity: 1,
                                    transition: {
                                        duration: 0.6,
                                        ease: [0.4, 0.0, 0.2, 1]
                                    }
                                }}
                                className="min-h-full w-full glass-effect rounded-xl p-6 lg:p-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                                        {selectedProject.title}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setProjectState(prev => ({ ...prev, selectedProject: null }))
                                            setIsModalOpen(false)
                                        }}
                                        className="p-3 hover:bg-surface rounded-lg transition-colors duration-300 touch-manipulation"
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                    >
                                        <X className="w-6 h-6 text-foreground-secondary" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column - Project Info */}
                                    <div className="space-y-6">
                                        {'achievement' in selectedProject && selectedProject.achievement && (
                                            <div className="relative group">
                                                <div className="overflow-x-auto scrollbar-hide">
                                                    <span className="text-lg font-menlo text-secondary font-semibold whitespace-nowrap">
                                                        {selectedProject.achievement}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-3">
                                            <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                                                {selectedProject.category}
                                            </span>
                                            {selectedProject.hackathon && (
                                                <span className="text-sm px-3 py-2 bg-secondary border border-secondary rounded-xl text-background whitespace-nowrap font-semibold">
                                                    {selectedProject.hackathon}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-semibold mb-4 text-foreground">About This Project</h4>
                                            <p className="text-foreground-secondary leading-relaxed font-medium text-base">
                                                {selectedProject.longDescription}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-semibold mb-4 text-foreground">Technologies Used</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-sm px-3 py-1 rounded-lg text-background whitespace-nowrap bg-primary border border-primary font-semibold"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {'live' in selectedProject && selectedProject.live && (
                                                <motion.a
                                                    href={selectedProject.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm px-6 py-3 bg-surface dark:bg-surface-secondary hover:bg-transparent dark:hover:bg-transparent text-foreground border border-surface-secondary dark:border-surface-tertiary rounded-lg whitespace-nowrap font-medium flex items-center justify-center gap-2 transition-all duration-200 touch-manipulation shadow-lg backdrop-blur-sm"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Open in New Tab
                                                </motion.a>
                                            )}
                                            {'github' in selectedProject && selectedProject.github && (
                                                <motion.a
                                                    href={selectedProject.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="text-sm px-6 py-3 bg-secondary/10 border border-gray-600 dark:border-secondary/20 rounded-lg text-secondary whitespace-nowrap font-medium flex items-center justify-center gap-2 hover:bg-secondary hover:text-background transition-colors duration-200 touch-manipulation"
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
                                                    className="text-sm px-6 py-3 bg-surface dark:bg-surface-secondary hover:bg-transparent dark:hover:bg-transparent text-foreground border border-surface-secondary dark:border-surface-tertiary rounded-lg whitespace-nowrap font-medium flex items-center justify-center gap-2 transition-all duration-200 touch-manipulation shadow-lg backdrop-blur-sm"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Open in New Tab (CMS)
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Column - Media Content */}
                                    <div className="space-y-6">
                                        {/* Live Website Preview */}
                                        {'live' in selectedProject && selectedProject.live && (selectedProject.title === 'Oxley Pawnshop Website' || selectedProject.title === 'Goldjewel Website & CMS' || selectedProject.title === 'SilverSigma') && (
                                            <div>
                                                <h4 className="text-xl font-semibold mb-4 text-foreground">Live Website Preview</h4>
                                                <div className="relative w-full h-96 lg:h-[500px] rounded-lg overflow-hidden border border-surface-secondary">
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
                                                    <div className="absolute top-2 right-2 z-10">
                                                        <a
                                                            href={selectedProject.live}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 bg-surface dark:bg-surface-secondary hover:bg-transparent dark:hover:bg-transparent text-foreground border border-surface-secondary dark:border-surface-tertiary px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 shadow-lg backdrop-blur-sm"
                                                        >
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                            Open in New Tab
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Video Demo */}
                                        {selectedProject && <VideoSection selectedProject={selectedProject} />}
                                    </div>
                                </div>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    )
});

