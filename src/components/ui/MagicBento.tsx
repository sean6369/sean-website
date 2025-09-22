import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { Github, ExternalLink } from 'lucide-react';
import './MagicBento.css';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '203, 166, 247'; // Default to primary color in RGB
const MOBILE_BREAKPOINT = 768;

// Function to get theme colors dynamically
const getThemeColors = () => {
    if (typeof window === 'undefined') return {
        primary: '203, 166, 247',
        secondary: '245, 194, 231',
        surface: '49, 50, 68'
    };

    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '203, 166, 247';
    };

    const primary = hexToRgb(computedStyle.getPropertyValue('--primary').trim());
    const secondary = hexToRgb(computedStyle.getPropertyValue('--secondary').trim());
    const surface = hexToRgb(computedStyle.getPropertyValue('--surface').trim());

    return { primary, secondary, surface };
};

const cardData = [
    {
        color: 'transparent',
        title: 'Goldjewel Website & CMS',
        description: 'Modern website for jewelry business with custom CMS',
        label: 'Web App'
    },
    {
        color: 'transparent',
        title: 'Oxley Pawnshop Website',
        description: 'Modern website for Singapore-based pawnshop',
        label: 'Web App'
    },
    {
        color: 'transparent',
        title: 'SigmaHealth',
        description: 'AI-powered multilingual React Native health app',
        label: 'Mobile App'
    },
    {
        color: 'transparent',
        title: 'SigmaShield',
        description: 'AI-powered mobile app for scam detection',
        label: 'Mobile App'
    },
    {
        color: 'transparent',
        title: 'GymFit',
        description: 'Cross-platform fitness app with Flutter',
        label: 'Mobile App'
    },
    {
        color: 'transparent',
        title: 'NoFap',
        description: 'Modern web app for motivation and progress tracking',
        label: 'Web App'
    },
    {
        color: 'transparent',
        title: 'Ship Vessel Risk Detection',
        description: 'AI pipeline for vessel deficiency prediction',
        label: 'AI/ML'
    }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR) => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
    return el;
};

const calculateSpotlightValues = (radius: number) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty('--glow-x', `${relativeX}%`);
    card.style.setProperty('--glow-y', `${relativeY}%`);
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', `${radius}px`);
};

interface ParticleCardProps {
    children: React.ReactNode;
    className?: string;
    disableAnimations?: boolean;
    style?: React.CSSProperties;
    particleCount?: number;
    glowColor?: string;
    enableTilt?: boolean;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
    onCardClick?: ((e: React.MouseEvent) => void) | null;
}

const ParticleCard = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
    clickEffect = false,
    enableMagnetism = false,
    onCardClick = null
}: ParticleCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLElement[]>([]);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const isHoveredRef = useRef(false);
    const memoizedParticles = useRef<HTMLElement[]>([]);
    const particlesInitialized = useRef(false);
    const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

    const initializeParticles = useCallback(() => {
        if (particlesInitialized.current || !cardRef.current) return;

        const { width, height } = cardRef.current.getBoundingClientRect();
        memoizedParticles.current = Array.from({ length: particleCount }, () =>
            createParticleElement(Math.random() * width, Math.random() * height, glowColor)
        );
        particlesInitialized.current = true;
    }, [particleCount, glowColor]);

    const clearAllParticles = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        magnetismAnimationRef.current?.kill();

        particlesRef.current.forEach(particle => {
            gsap.to(particle, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'back.in(1.7)',
                onComplete: () => {
                    particle.parentNode?.removeChild(particle);
                }
            });
        });
        particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
        if (!cardRef.current || !isHoveredRef.current) return;

        if (!particlesInitialized.current) {
            initializeParticles();
        }

        memoizedParticles.current.forEach((particle, index) => {
            const timeoutId = setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return;

                const clone = particle.cloneNode(true) as HTMLElement;
                cardRef.current.appendChild(clone);
                particlesRef.current.push(clone);

                gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

                gsap.to(clone, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    rotation: Math.random() * 360,
                    duration: 2 + Math.random() * 2,
                    ease: 'none',
                    repeat: -1,
                    yoyo: true
                });

                gsap.to(clone, {
                    opacity: 0.3,
                    duration: 1.5,
                    ease: 'power2.inOut',
                    repeat: -1,
                    yoyo: true
                });
            }, index * 100);

            timeoutsRef.current.push(timeoutId);
        });
    }, [initializeParticles]);

    useEffect(() => {
        if (disableAnimations || !cardRef.current) return;

        const element = cardRef.current;

        const handleMouseEnter = () => {
            isHoveredRef.current = true;
            animateParticles();

            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 2,
                    rotateY: 2,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }
        };

        const handleMouseLeave = () => {
            isHoveredRef.current = false;
            clearAllParticles();

            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            if (enableMagnetism) {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!enableTilt && !enableMagnetism) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            if (enableTilt) {
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                gsap.to(element, {
                    rotateX,
                    rotateY,
                    duration: 0.1,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }

            if (enableMagnetism) {
                const magnetX = (x - centerX) * 0.05;
                const magnetY = (y - centerY) * 0.05;

                magnetismAnimationRef.current = gsap.to(element, {
                    x: magnetX,
                    y: magnetY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const handleClick = (e: MouseEvent) => {
            if (onCardClick) {
                onCardClick(e as any);
            }

            if (!clickEffect) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const maxDistance = Math.max(
                Math.hypot(x, y),
                Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height),
                Math.hypot(x - rect.width, y - rect.height)
            );

            const ripple = document.createElement('div');
            ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

            element.appendChild(ripple);

            gsap.fromTo(
                ripple,
                {
                    scale: 0,
                    opacity: 1
                },
                {
                    scale: 1,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                }
            );
        };

        const handleTouchStart = (e: TouchEvent) => {
            // Prevent default to avoid double-tap zoom
            e.preventDefault();
        };

        const handleTouchEnd = (e: TouchEvent) => {
            // Handle touch as click for mobile
            if (onCardClick) {
                onCardClick(e as any);
            }
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('click', handleClick);
        element.addEventListener('touchstart', handleTouchStart, { passive: false });
        element.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            isHoveredRef.current = false;
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('click', handleClick);
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchend', handleTouchEnd);
            clearAllParticles();
        };
    }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor, onCardClick]);

    return (
        <div
            ref={cardRef}
            className={`${className} particle-container`}
            style={{ ...style, position: 'relative', overflow: 'hidden' }}
            onClick={(e) => {
                console.log('Card clicked!', e);
                if (onCardClick) {
                    onCardClick(e);
                }
            }}
        >
            {children}
        </div>
    );
};

interface GlobalSpotlightProps {
    gridRef: React.RefObject<HTMLDivElement>;
    disableAnimations?: boolean;
    enabled?: boolean;
    spotlightRadius?: number;
    glowColor?: string;
}

const GlobalSpotlight = ({
    gridRef,
    disableAnimations = false,
    enabled = true,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR
}: GlobalSpotlightProps) => {
    const spotlightRef = useRef<HTMLDivElement | null>(null);
    const isInsideSection = useRef(false);

    useEffect(() => {
        if (disableAnimations || !gridRef?.current || !enabled) return;

        const spotlight = document.createElement('div');
        spotlight.className = 'global-spotlight';
        spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.4) 0%,
        rgba(${glowColor}, 0.3) 15%,
        rgba(${glowColor}, 0.2) 25%,
        rgba(${glowColor}, 0.1) 40%,
        rgba(${glowColor}, 0.05) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      left: -400px;
      top: -400px;
      transform: translate(-50%, -50%);
      mix-blend-mode: overlay;
    `;
        document.body.appendChild(spotlight);
        spotlightRef.current = spotlight;

        const handleMouseMove = (e: MouseEvent) => {
            if (!spotlightRef.current || !gridRef.current) return;

            const section = gridRef.current.closest('.bento-section');
            const rect = section?.getBoundingClientRect();
            const mouseInside =
                rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

            isInsideSection.current = mouseInside || false;
            const cards = gridRef.current.querySelectorAll('.card');

            if (!mouseInside) {
                gsap.to(spotlightRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                cards.forEach(card => {
                    (card as HTMLElement).style.setProperty('--glow-intensity', '0');
                });
                return;
            }

            const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
            let minDistance = Infinity;

            cards.forEach(card => {
                const cardElement = card as HTMLElement;
                const cardRect = cardElement.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const distance =
                    Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                const effectiveDistance = Math.max(0, distance);

                minDistance = Math.min(minDistance, effectiveDistance);

                let glowIntensity = 0;
                if (effectiveDistance <= proximity) {
                    glowIntensity = 1;
                } else if (effectiveDistance <= fadeDistance) {
                    glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                }

                updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
            });

            gsap.to(spotlightRef.current, {
                left: e.clientX,
                top: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });

            const targetOpacity =
                minDistance <= proximity
                    ? 1.0
                    : minDistance <= fadeDistance
                        ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 1.0
                        : 0;

            gsap.to(spotlightRef.current, {
                opacity: targetOpacity,
                duration: targetOpacity > 0 ? 0.2 : 0.5,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            isInsideSection.current = false;
            gridRef.current?.querySelectorAll('.card').forEach(card => {
                (card as HTMLElement).style.setProperty('--glow-intensity', '0');
            });
            if (spotlightRef.current) {
                gsap.to(spotlightRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
        };
    }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

    return null;
};

interface BentoCardGridProps {
    children: React.ReactNode;
    gridRef: React.RefObject<HTMLDivElement>;
}

const BentoCardGrid = ({ children, gridRef }: BentoCardGridProps) => (
    <div className="card-grid bento-section" ref={gridRef}>
        {children}
    </div>
);

const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

interface Project {
    id: number;
    title: string;
    description: string;
    longDescription?: string;
    category: string;
    technologies?: string[];
    image?: string;
    live?: string;
    github?: string;
    cms?: string;
    hackathon?: string;
    video?: string;
    achievement?: string;
    date?: string;
}

interface MagicBentoProps {
    textAutoHide?: boolean;
    enableStars?: boolean;
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    disableAnimations?: boolean;
    spotlightRadius?: number;
    particleCount?: number;
    enableTilt?: boolean;
    glowColor?: string | null;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
    onCardClick?: ((e: React.MouseEvent) => void) | null;
    projects?: Project[];
}

const MagicBento = ({
    textAutoHide = true,
    enableStars = true,
    enableSpotlight = true,
    enableBorderGlow = true,
    disableAnimations = false,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableTilt = false,
    glowColor = null,
    clickEffect = true,
    enableMagnetism = true,
    onCardClick = null,
    projects = []
}: MagicBentoProps) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useMobileDetection();
    const shouldDisableAnimations = disableAnimations || isMobile;

    // Get theme colors dynamically and update on theme change
    const [themeColors, setThemeColors] = useState(getThemeColors());
    const effectiveGlowColor = glowColor || themeColors.primary;
    const spotlightColor = themeColors.secondary; // Use secondary color for spotlight

    useEffect(() => {
        const updateThemeColors = () => {
            const newThemeColors = getThemeColors();
            setThemeColors(newThemeColors);

            // Update CSS custom properties for RGB values
            if (gridRef.current) {
                gridRef.current.style.setProperty('--bento-glow-primary-rgb', newThemeColors.primary);
                gridRef.current.style.setProperty('--bento-glow-secondary-rgb', newThemeColors.secondary);
                gridRef.current.style.setProperty('--bento-surface-rgb', newThemeColors.surface);
            }
        };

        // Listen for theme changes
        const observer = new MutationObserver(updateThemeColors);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Initial update
        updateThemeColors();

        return () => observer.disconnect();
    }, []);

    return (
        <div className="magic-bento">
            {enableSpotlight && (
                <GlobalSpotlight
                    gridRef={gridRef}
                    disableAnimations={shouldDisableAnimations}
                    enabled={enableSpotlight}
                    spotlightRadius={spotlightRadius}
                    glowColor={spotlightColor}
                />
            )}

            <BentoCardGrid gridRef={gridRef}>
                {projects.map((project, index) => {
                    const baseClassName = `card ${textAutoHide ? 'card--text-autohide' : ''} ${enableBorderGlow ? 'card--border-glow' : ''}`;
                    const cardProps = {
                        className: baseClassName,
                        style: {
                            backgroundColor: 'transparent',
                            '--glow-color': effectiveGlowColor
                        }
                    };

                    if (enableStars) {
                        return (
                            <ParticleCard
                                key={index}
                                {...cardProps}
                                disableAnimations={shouldDisableAnimations}
                                particleCount={particleCount}
                                glowColor={effectiveGlowColor}
                                enableTilt={enableTilt}
                                clickEffect={clickEffect}
                                enableMagnetism={enableMagnetism}
                                onCardClick={onCardClick}
                            >
                                <div className="card__header">
                                    <div className="card__label">{project.category}</div>
                                    {project.hackathon && (
                                        <div className="card__hackathon">{project.hackathon}</div>
                                    )}
                                </div>
                                <div className="card__content">
                                    <h2 className="card__title">{project.title}</h2>
                                    {project.achievement && (
                                        <div className="card__achievement">
                                            <div
                                                className="card__achievement-scroll"
                                                ref={(el) => {
                                                    if (el) {
                                                        const checkScrollability = () => {
                                                            const canScroll = el.scrollWidth > el.clientWidth;
                                                            const leftBtn = el.parentElement?.querySelector('.card__achievement-left-btn') as HTMLElement;
                                                            const rightBtn = el.parentElement?.querySelector('.card__achievement-right-btn') as HTMLElement;

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
                                                <span className="card__achievement-text">
                                                    {project.achievement}
                                                </span>
                                            </div>
                                            <div
                                                className="card__achievement-left-btn"
                                                ref={(el) => {
                                                    if (el) {
                                                        const handleClick = (e: Event) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            e.stopImmediatePropagation();
                                                            const container = el.parentElement?.querySelector('.card__achievement-scroll') as HTMLElement;
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
                                                    }
                                                }}
                                            >
                                                <svg className="card__achievement-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="15,18 9,12 15,6"></polyline>
                                                </svg>
                                            </div>
                                            <div
                                                className="card__achievement-right-btn"
                                                ref={(el) => {
                                                    if (el) {
                                                        const handleClick = (e: Event) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            e.stopImmediatePropagation();
                                                            const container = el.parentElement?.querySelector('.card__achievement-scroll') as HTMLElement;
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
                                                    }
                                                }}
                                            >
                                                <svg className="card__achievement-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="9,18 15,12 9,6"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    <p className="card__description">{project.description}</p>
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="card__technologies">
                                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                                <span key={techIndex} className="card__tech-tag">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="card__tech-more">
                                                    +{project.technologies.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {(project.github || project.live) && (
                                    <div className="card__links">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="card__link"
                                                ref={(el) => {
                                                    if (el) {
                                                        const handleClick = (e: Event) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            e.stopImmediatePropagation();
                                                            window.open(project.github, '_blank', 'noopener,noreferrer');
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
                                                    }
                                                }}
                                            >
                                                <Github className="card__link-icon" />
                                            </a>
                                        )}
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="card__link"
                                                ref={(el) => {
                                                    if (el) {
                                                        const handleClick = (e: Event) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            e.stopImmediatePropagation();
                                                            window.open(project.live, '_blank', 'noopener,noreferrer');
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
                                                    }
                                                }}
                                            >
                                                <ExternalLink className="card__link-icon" />
                                            </a>
                                        )}
                                    </div>
                                )}
                                {project.date && (
                                    <div className="card__date">
                                        {project.date}
                                    </div>
                                )}
                            </ParticleCard>
                        );
                    }

                    return (
                        <div
                            key={index}
                            {...cardProps}
                            onClick={(e) => {
                                console.log('Card clicked!', e);
                                if (onCardClick) {
                                    onCardClick(e);
                                }
                            }}
                            ref={el => {
                                if (!el) return;

                                const handleMouseMove = (e: MouseEvent) => {
                                    if (shouldDisableAnimations) return;

                                    const rect = el.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const centerX = rect.width / 2;
                                    const centerY = rect.height / 2;

                                    if (enableTilt) {
                                        const rotateX = ((y - centerY) / centerY) * -5;
                                        const rotateY = ((x - centerX) / centerX) * 5;
                                        gsap.to(el, {
                                            rotateX,
                                            rotateY,
                                            duration: 0.1,
                                            ease: 'power2.out',
                                            transformPerspective: 1000
                                        });
                                    }

                                    if (enableMagnetism) {
                                        const magnetX = (x - centerX) * 0.05;
                                        const magnetY = (y - centerY) * 0.05;
                                        gsap.to(el, {
                                            x: magnetX,
                                            y: magnetY,
                                            duration: 0.3,
                                            ease: 'power2.out'
                                        });
                                    }
                                };

                                const handleMouseLeave = () => {
                                    if (shouldDisableAnimations) return;

                                    if (enableTilt) {
                                        gsap.to(el, {
                                            rotateX: 0,
                                            rotateY: 0,
                                            duration: 0.3,
                                            ease: 'power2.out'
                                        });
                                    }

                                    if (enableMagnetism) {
                                        gsap.to(el, {
                                            x: 0,
                                            y: 0,
                                            duration: 0.3,
                                            ease: 'power2.out'
                                        });
                                    }
                                };

                                const handleClick = (e: MouseEvent) => {
                                    if (onCardClick) {
                                        onCardClick(e as any);
                                    }

                                    if (!clickEffect || shouldDisableAnimations) return;

                                    const rect = el.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;

                                    const maxDistance = Math.max(
                                        Math.hypot(x, y),
                                        Math.hypot(x - rect.width, y),
                                        Math.hypot(x, y - rect.height),
                                        Math.hypot(x - rect.width, y - rect.height)
                                    );

                                    const ripple = document.createElement('div');
                                    ripple.style.cssText = `
                    position: absolute;
                    width: ${maxDistance * 2}px;
                    height: ${maxDistance * 2}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                    left: ${x - maxDistance}px;
                    top: ${y - maxDistance}px;
                    pointer-events: none;
                    z-index: 1000;
                  `;

                                    el.appendChild(ripple);

                                    gsap.fromTo(
                                        ripple,
                                        {
                                            scale: 0,
                                            opacity: 1
                                        },
                                        {
                                            scale: 1,
                                            opacity: 0,
                                            duration: 0.8,
                                            ease: 'power2.out',
                                            onComplete: () => ripple.remove()
                                        }
                                    );
                                };

                                const handleTouchStart = (e: TouchEvent) => {
                                    // Prevent default to avoid double-tap zoom
                                    e.preventDefault();
                                };

                                const handleTouchEnd = (e: TouchEvent) => {
                                    // Handle touch as click for mobile
                                    if (onCardClick) {
                                        onCardClick(e as any);
                                    }
                                };

                                el.addEventListener('mousemove', handleMouseMove);
                                el.addEventListener('mouseleave', handleMouseLeave);
                                el.addEventListener('click', handleClick);
                                el.addEventListener('touchstart', handleTouchStart, { passive: false });
                                el.addEventListener('touchend', handleTouchEnd, { passive: true });
                            }}
                        >
                            <div className="card__header">
                                <div className="card__label">{project.category}</div>
                                {project.hackathon && (
                                    <div className="card__hackathon">{project.hackathon}</div>
                                )}
                            </div>
                            <div className="card__content">
                                <h2 className="card__title">{project.title}</h2>
                                {project.achievement && (
                                    <div className="card__achievement">
                                        <div
                                            className="card__achievement-scroll"
                                            ref={(el) => {
                                                if (el) {
                                                    const checkScrollability = () => {
                                                        const canScroll = el.scrollWidth > el.clientWidth;
                                                        const leftBtn = el.parentElement?.querySelector('.card__achievement-left-btn') as HTMLElement;
                                                        const rightBtn = el.parentElement?.querySelector('.card__achievement-right-btn') as HTMLElement;

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
                                            <span className="card__achievement-text">
                                                {project.achievement}
                                            </span>
                                        </div>
                                        <div
                                            className="card__achievement-left-btn"
                                            ref={(el) => {
                                                if (el) {
                                                    const handleClick = (e: Event) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        e.stopImmediatePropagation();
                                                        const container = el.parentElement?.querySelector('.card__achievement-scroll') as HTMLElement;
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
                                                }
                                            }}
                                        >
                                            <svg className="card__achievement-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15,18 9,12 15,6"></polyline>
                                            </svg>
                                        </div>
                                        <div
                                            className="card__achievement-right-btn"
                                            ref={(el) => {
                                                if (el) {
                                                    const handleClick = (e: Event) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        e.stopImmediatePropagation();
                                                        const container = el.parentElement?.querySelector('.card__achievement-scroll') as HTMLElement;
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
                                                }
                                            }}
                                        >
                                            <svg className="card__achievement-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9,18 15,12 9,6"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                                <p className="card__description">{project.description}</p>
                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="card__technologies">
                                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                            <span key={techIndex} className="card__tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="card__tech-more">
                                                +{project.technologies.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}
                                {(project.github || project.live) && (
                                    <div className="card__links">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="card__link"
                                                ref={(el) => {
                                                    if (el) {
                                                        const handleClick = (e: Event) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            e.stopImmediatePropagation();
                                                            window.open(project.github, '_blank', 'noopener,noreferrer');
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
                                                    }
                                                }}
                                            >
                                                <Github className="card__link-icon" />
                                            </a>
                                        )}
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="card__link"
                                                ref={(el) => {
                                                    if (el) {
                                                        const handleClick = (e: Event) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            e.stopImmediatePropagation();
                                                            window.open(project.live, '_blank', 'noopener,noreferrer');
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
                                                    }
                                                }}
                                            >
                                                <ExternalLink className="card__link-icon" />
                                            </a>
                                        )}
                                    </div>
                                )}
                                {project.date && (
                                    <div className="card__date">
                                        {project.date}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </BentoCardGrid>
        </div>
    );
};

export default MagicBento;
