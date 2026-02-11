'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, Smartphone, Brain, Globe } from 'lucide-react'
import { useState, useMemo, memo, useEffect, useRef } from 'react'
import { useIsMobile, useReducedMotion } from '@/lib/hooks'
import { useModal } from '@/lib/modal-context'

const projectsData = [
    {
        id: 12,
        title: 'SigmaGuide',
        description: 'AI-powered screen guidance assistant that watches your screen and gives step-by-step instructions for any software.',
        longDescription: 'SigmaGuide is an AI-powered desktop assistant that captures and analyzes your screen to provide step-by-step guidance for any software. It uses OpenAI GPT-4o vision to understand what\'s on screen, decomposes tasks into atomic steps, and automatically detects when you complete each step. Features include an always-on-top sidebar (toggle with ⌘/Ctrl + Shift + G), natural-language chat for questions like "How do I freeze the top row in Excel?", and progress tracking that advances as you follow the steps.',
        image: '/images/Hack&Roll screen.png',
        technologies: ['Electron', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'OpenAI GPT-4o'],
        video: '/videos/SigmaGuide demo video.mp4',
        github: 'https://github.com/Path-yang/SigmaGuide',
        hackathon: '@Hack & Roll 2026',
        category: 'AI/ML',
        date: 'Jan 2026',
    },
    {
        id: 11,
        title: 'SigmaPay',
        description: 'Cross-border financial platform for instant remittances, escrow, and RWA tokenization on the XRP Ledger.',
        longDescription: 'SigmaPay unifies payments, escrow, and asset tokenization into a single mobile-first interface built on the XRP Ledger. It delivers instant transfers settling in 3-5 seconds, fees under $0.01 per transaction, and RLUSD stablecoin for price stability. Features include on-chain identity verification (DID) for compliance, time-locked and condition-locked escrow payments, and real-world asset tokenization for property, commodities, and trade finance. Verified users get direct instant payments; unverified users send via claimable checks.',
        image: '/images/Fintech Summit screen.jpeg',
        technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'xrpl.js', 'shadcn/ui'],
        video: '/videos/SigmaPay demo video.mp4',
        github: 'https://github.com/Path-yang/SigmaPay',
        live: 'https://sigma-pay-ten.vercel.app/',
        hackathon: '@NUS FinTech Summit',
        category: 'Web App',
        date: 'Jan 2026',
    },
    {
        id: 10,
        title: 'PSA L2 Ops AI-Copilot',
        achievement: '🏆 3rd runner up (top 4 of 400+ teams)',
        description: 'AI diagnostic assistant analyzes alerts and generates actionable root-cause reports.',
        longDescription: 'An AI-powered co-pilot for Level 2 port operations, built to automate incident triage, diagnosis, and resolution planning. It ingests unstructured alerts from email, SMS, and phone logs, extracts ticket context, and correlates evidence across application logs, SOPs, and historical cases to surface probable root causes with confidence scores. The system generates step-by-step resolution plans, including SQL checks, verification steps, and escalation guidance, and stores them in a full ticket lifecycle UI for editing, notes, and status tracking. Backed by Flask APIs, Azure OpenAI, and Neon Postgres (with SQLite for local dev). Features include a modern analytics dashboard and queue-managed request handling. Designed for fast, reliable L2 support with transparent reasoning, responsive UX, and zero local setup friction.',
        image: '/images/PSA Code Sprint screen.png',
        linksNote: 'Live site and code are confidential and cannot be shared publicly.',
        technologies: [],
        video: '/videos/PSA code sprint demo video.mp4',
        hackathon: '@PSA Code Sprint',
        category: 'Web App',
        date: 'Oct 2025',
    },
    {
        id: 9,
        title: 'SilverSigma',
        description: 'Digital hub for seniors to connect, explore hobbies, and chat with an AI companion.',
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
        id: 8,
        title: 'SentinelAI',
        description: 'AI system that turns IP cameras into real-time detectors for falls and emergencies.',
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
        id: 7,
        title: 'SigmaHealth',
        achievement: '🏆 Finalist (top 10 of 60+ teams) • Best Usage of Data Award',
        description: 'Public health app with live data, GPT-based guidance, and community reporting',
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
        id: 6,
        title: 'Goldjewel Website & CMS',
        description: 'Contemporary jewelry site paired with a fully custom content management system.',
        longDescription: 'As a solo software engineer intern, I built and deployed a modern website for a jewelry business along with a custom content management system (CMS). The website features a dynamic homepage with fluid animations to showcase products elegantly, while the CMS provides an intuitive interface for the team to manage product listings with ease. The CMS includes built-in image cropping tools and supports instant, real-time updates to the website whenever new products are added or existing ones are modified, ensuring a seamless workflow between product management and customer-facing updates.',
        image: '/projects/goldjewel.jpg',
        technologies: ['Frontend Development', 'CMS Development', 'Database Management', 'Image Processing', 'Real-time Updates'],
        live: 'https://www.goldjewel.sg/',
        cms: 'https://cms.goldjewel.sg/login',
        category: 'Web App',
        date: 'Jun 2025 - Aug 2025',
    },
    {
        id: 5,
        title: 'SigmaShield',
        achievement: '🏆 Finalist (top 20 of 80+ teams)',
        description: 'Scam detection app for URL analysis, scam education, and community reporting.',
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
        id: 4,
        title: 'Oxley Pawnshop Website',
        description: 'Modern website for a Singapore-based pawnshop with live gold prices.',
        longDescription: 'A modern website for a Singapore-based pawnshop designed and launched by a solo developer intern. Features an interactive homepage with smooth animations, contact form integrated with company email and automated replies, real-time gold price updates with fallback data sources, and fully configured company email accounts for all team members.',
        image: '/projects/oxleypawnshop.jpg',
        technologies: ['Frontend Development', 'Backend Integration', 'API Integration', 'Email Services', 'Real-time Data'],
        live: 'https://www.oxleypawnshop.com/',
        category: 'Web App',
        date: 'May 2025 - Jun 2025',
    },
    {
        id: 3,
        title: 'GymFit',
        description: 'Cross-platform fitness app featuring workout and calorie tracking.',
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
        id: 2,
        title: 'NoFap',
        description: 'Social motivation app featuring donation incentives and peer support.',
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
        id: 1,
        title: 'Ship Vessel Risk Detection Model',
        achievement: '🏆 Top 3',
        description: 'A two-stage AI pipeline predicting vessel deficiency severity from inspection text.',
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

    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

    const iframeContainerRef = useRef<HTMLDivElement>(null)
    const [iframeScale, setIframeScale] = useState(1)
    const [iframeDimensions, setIframeDimensions] = useState({ width: 1280, height: 720 })
    const isMobile = useIsMobile()
    const prefersReducedMotion = useReducedMotion()

    // Project background images mapping (id = newest first, 12 = newest)
    const projectBackgrounds: Record<number, string> = {
        12: '/images/Hack&Roll screen.png',
        11: '/images/Fintech Summit screen.jpeg',
        10: '/images/PSA Code Sprint screen.png',
        9: '/images/What the Hack screen.png',
        8: '/images/SentinelAI screen.png',
        7: '/images/Lifehack screen.jpeg',
        6: '/images/Goldjewel screen.jpg',
        5: '/images/DSTA Brainhack screen.png',
        4: '/images/Oxley Pawnshop screen.jpeg',
        3: '/images/Orbital screen.png',
        2: '/images/Hackomania screen.png',
        1: '/images/Marinetime Hackathon screen.jpeg',
    };

    // Calculate iframe scale to maintain desktop or mobile viewport
    useEffect(() => {
        // Set dimensions based on device type
        const viewportWidth = isMobile ? 375 : 1280
        const viewportHeight = isMobile ? 667 : 720
        setIframeDimensions({ width: viewportWidth, height: viewportHeight })

        const calculateScale = () => {
            if (iframeContainerRef.current) {
                const containerWidth = iframeContainerRef.current.offsetWidth
                const containerHeight = iframeContainerRef.current.offsetHeight

                // Calculate scale to fit container while maintaining aspect ratio
                const scaleX = containerWidth / viewportWidth
                const scaleY = containerHeight / viewportHeight
                const scale = Math.min(scaleX, scaleY, 1) // Don't scale up beyond 100%

                setIframeScale(scale)
            }
        }

        calculateScale()

        const resizeObserver = new ResizeObserver(calculateScale)
        if (iframeContainerRef.current) {
            resizeObserver.observe(iframeContainerRef.current)
        }

        window.addEventListener('resize', calculateScale)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener('resize', calculateScale)
        }
    }, [selectedProject, isMobile])

    const handleCardClick = (project: typeof projects[0]) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    const handleClose = () => {
        setSelectedProject(null)
        setIsModalOpen(false)
    }

    const getCategoryIcon = (category: string) => {
        switch (category) {
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

    return (
        <motion.section
            id="projects"
            className="relative z-[2] pt-0 pb-0 mb-0 bg-background-tertiary"
        >
            <div className="relative z-10 pt-8 md:pt-12 lg:pt-16 px-3 sm:px-4 lg:px-6 pb-12 md:pb-16 lg:pb-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }
                    }}
                    viewport={{ once: true, amount: 0.1 }}
                    className="text-left mb-10"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-clash-display">
                        PROJECTS.
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{
                        opacity: 1,
                        transition: {
                            duration: 0.65,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }
                    }}
                    viewport={{ once: true, amount: 0.05 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 [content-visibility:auto]"
                >
                    {projects.map((project) => {
                        const background = projectBackgrounds[project.id]

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
                        const CategoryIcon = getCategoryIcon()

                        return (
                            <motion.button
                                key={project.id}
                                type="button"
                                className="group text-left w-full h-full rounded-2xl bg-background/90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 flex flex-col"
                                onClick={() => handleCardClick(project)}
                                whileTap={{ scale: 0.995 }}
                            >
                                <div className="relative w-full aspect-[16/11] overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundImage: `url('${background}')` }}
                                    />
                                </div>

                                <div className="p-4 sm:p-6 flex flex-col gap-2 flex-1">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-xs px-3 py-1 bg-background border-[0.5px] border-foreground/10 text-foreground-secondary font-semibold flex items-center gap-1.5">
                                                <CategoryIcon className="w-4 h-4 text-foreground-secondary" />
                                                {project.category}
                                            </span>
                                            <span className="text-xs px-3 py-1 bg-background border-[0.5px] border-foreground/10 text-foreground-secondary font-semibold">
                                                {project.date}
                                            </span>
                                        </div>
                                        {project.achievement && (
                                            <span className="text-xs px-3 py-1 bg-background border-[0.5px] border-foreground/10 text-foreground-secondary font-semibold">
                                                {project.achievement}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-base text-foreground-secondary font-medium line-clamp-3">
                                            {project.description}
                                        </p>
                                    </div>

                                </div>
                            </motion.button>
                        )
                    })}
                </motion.div>

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
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 overscroll-contain"
                            style={{
                                maxHeight: '100vh',
                                WebkitOverflowScrolling: 'touch',
                            }}
                            onWheel={(e) => e.stopPropagation()}
                            onClick={handleClose}
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
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                                            {selectedProject.title}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="p-3 hover:bg-surface rounded-lg transition-colors duration-300 touch-manipulation"
                                        style={{ WebkitTapHighlightColor: 'transparent' }}
                                    >
                                        <X className="w-6 h-6 text-foreground-secondary" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column - Project Info */}
                                    <div className="space-y-6">
                                        <div className="flex flex-wrap gap-2 -mt-4">
                                            <span className="text-sm px-3 py-1 bg-background border-[0.5px] border-foreground/10 text-foreground-secondary font-semibold flex items-center gap-1.5 whitespace-nowrap">
                                                {(() => {
                                                    const CategoryIcon = getCategoryIcon(selectedProject.category)
                                                    return <CategoryIcon className="w-4 h-4 text-foreground-secondary" />
                                                })()}
                                                {selectedProject.category}
                                            </span>
                                            {'achievement' in selectedProject && selectedProject.achievement && (
                                                <span className="text-sm px-3 py-1 bg-background border-[0.5px] border-foreground/10 text-foreground-secondary font-semibold whitespace-nowrap">
                                                    {selectedProject.achievement}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-semibold mb-4 text-foreground">About This Project</h4>
                                            <p className="text-foreground-secondary leading-relaxed font-medium text-base">
                                                {selectedProject.longDescription}
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {'live' in selectedProject && selectedProject.live && (
                                                <motion.a
                                                    href={selectedProject.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="text-sm px-6 py-3 bg-primary/10 border border-gray-600 dark:border-primary/20 rounded-none text-primary whitespace-nowrap font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-background transition-colors duration-200 touch-manipulation"
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
                                                    className="text-sm px-6 py-3 bg-secondary/10 border border-gray-600 dark:border-secondary/20 rounded-none text-secondary whitespace-nowrap font-medium flex items-center justify-center gap-2 hover:bg-secondary hover:text-background transition-colors duration-200 touch-manipulation"
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
                                                    className="text-sm px-6 py-3 bg-secondary/10 border border-gray-600 dark:border-secondary/20 rounded-none text-secondary whitespace-nowrap font-medium flex items-center justify-center gap-2 hover:bg-secondary hover:text-background transition-colors duration-200 touch-manipulation"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Open in New Tab (CMS)
                                                </motion.a>
                                            )}
                                        </div>
                                        {!('live' in selectedProject && selectedProject.live) &&
                                            !('github' in selectedProject && selectedProject.github) &&
                                            !('cms' in selectedProject && selectedProject.cms) &&
                                            'linksNote' in selectedProject && selectedProject.linksNote && (
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    {selectedProject.linksNote}
                                                </p>
                                            )}
                                    </div>

                                    {/* Right Column - Media Content */}
                                    <div className="space-y-6">
                                        {/* Hackathon Tag */}
                                        {selectedProject.hackathon && (
                                            <div className="flex flex-wrap gap-2 -mt-4">
                                                <span className="text-sm px-3 py-1 bg-background border-[0.5px] border-foreground/10 text-foreground-secondary font-semibold whitespace-nowrap">
                                                    {selectedProject.hackathon}
                                                </span>
                                            </div>
                                        )}

                                        {/* Live Website Preview */}
                                        {'live' in selectedProject && selectedProject.live && (selectedProject.title === 'Oxley Pawnshop Website' || selectedProject.title === 'Goldjewel Website & CMS' || selectedProject.title === 'SilverSigma') && (
                                            <div>
                                                <h4 className="text-xl font-semibold mb-4 text-foreground">Live Website Preview</h4>
                                                <div
                                                    ref={iframeContainerRef}
                                                    className="relative w-full rounded-lg overflow-hidden border border-surface-secondary bg-black"
                                                    style={{
                                                        aspectRatio: isMobile ? `${iframeDimensions.width} / ${iframeDimensions.height}` : '16 / 9',
                                                        minHeight: isMobile ? '300px' : '400px'
                                                    }}
                                                >
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div
                                                            style={{
                                                                width: `${iframeDimensions.width}px`,
                                                                height: `${iframeDimensions.height}px`,
                                                                transform: `scale(${iframeScale})`,
                                                                transformOrigin: 'center center'
                                                            }}
                                                        >
                                                            <iframe
                                                                src={selectedProject.live}
                                                                title={`${selectedProject.title} Live Preview`}
                                                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                                                loading="lazy"
                                                                style={{
                                                                    width: `${iframeDimensions.width}px`,
                                                                    height: `${iframeDimensions.height}px`,
                                                                    border: 'none',
                                                                    display: 'block'
                                                                }}
                                                            />
                                                        </div>
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

                                        {/* Background Image Fallback for NoFap and Ship Vessel */}
                                        {selectedProject &&
                                            !('live' in selectedProject && selectedProject.live && (selectedProject.title === 'Oxley Pawnshop Website' || selectedProject.title === 'Goldjewel Website & CMS' || selectedProject.title === 'SilverSigma')) &&
                                            !('video' in selectedProject && selectedProject.video) &&
                                            !('videos' in selectedProject && selectedProject.videos && Array.isArray(selectedProject.videos) && selectedProject.videos.length > 0) &&
                                            (selectedProject.title === 'NoFap' || selectedProject.title === 'Ship Vessel Risk Detection Model') && (
                                                <div>
                                                    <h4 className="text-xl font-semibold mb-4 text-foreground">Project Screenshot</h4>
                                                    <div className="relative w-full rounded-lg overflow-hidden border border-surface-secondary bg-black" style={{ aspectRatio: '16/9', minHeight: '400px' }}>
                                                        <div
                                                            className="w-full h-full bg-cover bg-center"
                                                            style={{
                                                                backgroundImage: selectedProject.title === 'NoFap'
                                                                    ? "url('/images/Hackomania screen.png')"
                                                                    : "url('/images/Marinetime Hackathon screen.jpeg')"
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                </div>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </motion.section>
    )
});

