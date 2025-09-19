'use client'

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

interface MenuItem {
    label: string;
    ariaLabel: string;
    link: string;
}

interface SocialItem {
    label: string;
    link: string;
}

interface StaggeredMenuProps {
    position?: 'left' | 'right';
    colors?: string[];
    items?: MenuItem[];
    socialItems?: SocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    className?: string;
    logoUrl?: string;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    changeMenuColorOnOpen?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
    onItemClick?: (item: MenuItem) => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    position = 'right',
    colors = ['#B19EEF', '#5227FF'],
    items = [],
    socialItems = [],
    displaySocials = true,
    displayItemNumbering = true,
    className,
    logoUrl = '/src/assets/logos/reactbits-gh-white.svg',
    menuButtonColor = '#fff',
    openMenuButtonColor = '#fff',
    accentColor = '#5227FF',
    changeMenuColorOnOpen = true,
    onMenuOpen,
    onMenuClose,
    onItemClick
}) => {
    const [open, setOpen] = useState(false);
    const openRef = useRef(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const preLayersRef = useRef<HTMLDivElement>(null);
    const preLayerElsRef = useRef<HTMLElement[]>([]);
    const plusHRef = useRef<HTMLSpanElement>(null);
    const plusVRef = useRef<HTMLSpanElement>(null);
    const iconRef = useRef<HTMLSpanElement>(null);
    const textInnerRef = useRef<HTMLSpanElement>(null);
    const textWrapRef = useRef<HTMLSpanElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [textLines, setTextLines] = useState(['Menu', 'Close']);

    const openTlRef = useRef<gsap.core.Timeline | null>(null);
    const closeTweenRef = useRef<gsap.core.Tween | null>(null);
    const spinTweenRef = useRef<gsap.core.Tween | null>(null);
    const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
    const colorTweenRef = useRef<gsap.core.Tween | null>(null);
    const toggleBtnRef = useRef<HTMLButtonElement>(null);
    const busyRef = useRef(false);
    const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;
            const plusH = plusHRef.current;
            const plusV = plusVRef.current;
            const icon = iconRef.current;
            const textInner = textInnerRef.current;
            if (!panel || !plusH || !plusV || !icon || !textInner) return;

            let preLayers: HTMLElement[] = [];
            if (preContainer) {
                preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
            }
            preLayerElsRef.current = preLayers;

            const offscreen = position === 'left' ? -100 : 100;
            gsap.set([panel, ...preLayers], { xPercent: offscreen });
            gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
            gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
            gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
            gsap.set(textInner, { yPercent: 0 });
            if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
        });
        return () => ctx.revert();
    }, [menuButtonColor, position]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        if (closeTweenRef.current) {
            closeTweenRef.current.kill();
            closeTweenRef.current = null;
        }
        itemEntranceTweenRef.current?.kill();

        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

        const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
        const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

        if (itemEls.length) {
            gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        if (numberEls.length) {
            gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        if (socialTitle) {
            gsap.set(socialTitle, { opacity: 0 });
        }
        if (socialLinks.length) {
            gsap.set(socialLinks, { y: 25, opacity: 0 });
        }

        const tl = gsap.timeline({ paused: true });

        layerStates.forEach((ls, i) => {
            tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
        });
        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;
        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
            panelInsertTime
        );

        if (itemEls.length) {
            const itemsStartRatio = 0.15;
            const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
            tl.to(
                itemEls,
                {
                    yPercent: 0,
                    rotate: 0,
                    duration: 1,
                    ease: 'power4.out',
                    stagger: { each: 0.1, from: 'start' }
                },
                itemsStart
            );
            if (numberEls.length) {
                tl.to(
                    numberEls,
                    {
                        duration: 0.6,
                        ease: 'power2.out',
                        '--sm-num-opacity': 1,
                        stagger: { each: 0.08, from: 'start' }
                    },
                    itemsStart + 0.1
                );
            }
        }

        if (socialTitle || socialLinks.length) {
            const socialsStart = panelInsertTime + panelDuration * 0.4;
            if (socialTitle) {
                tl.to(
                    socialTitle,
                    {
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power2.out'
                    },
                    socialsStart
                );
            }
            if (socialLinks.length) {
                tl.to(
                    socialLinks,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                        ease: 'power3.out',
                        stagger: { each: 0.08, from: 'start' },
                        onComplete: () => {
                            gsap.set(socialLinks, { clearProps: 'opacity' });
                        }
                    },
                    socialsStart + 0.04
                );
            }
        }

        openTlRef.current = tl;
        return tl;
    }, []);

    const playOpen = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const tl = buildOpenTimeline();
        if (tl) {
            tl.eventCallback('onComplete', () => {
                busyRef.current = false;
            });
            tl.play(0);
        } else {
            busyRef.current = false;
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        openTlRef.current = null;
        itemEntranceTweenRef.current?.kill();

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return;

        const all = [...layers, panel];
        closeTweenRef.current?.kill();
        const offscreen = position === 'left' ? -100 : 100;
        closeTweenRef.current = gsap.to(all, {
            xPercent: offscreen,
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
            onComplete: () => {
                const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
                if (itemEls.length) {
                    gsap.set(itemEls, { yPercent: 140, rotate: 10 });
                }
                const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
                if (numberEls.length) {
                    gsap.set(numberEls, { '--sm-num-opacity': 0 });
                }
                const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement;
                const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
                if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
                if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
                busyRef.current = false;
            }
        });
    }, [position]);

    const animateIcon = useCallback((opening: boolean) => {
        const icon = iconRef.current;
        if (!icon) return;
        spinTweenRef.current?.kill();
        if (opening) {
            spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
        } else {
            spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
        }
    }, []);

    const animateColor = useCallback(
        (opening: boolean) => {
            const btn = toggleBtnRef.current;
            if (!btn) return;
            colorTweenRef.current?.kill();
            if (changeMenuColorOnOpen) {
                const targetColor = opening ? openMenuButtonColor : menuButtonColor;
                colorTweenRef.current = gsap.to(btn, {
                    color: targetColor,
                    delay: 0.18,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.set(btn, { color: menuButtonColor });
            }
        },
        [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
    );

    const animateText = useCallback((opening: boolean) => {
        const inner = textInnerRef.current;
        if (!inner) return;
        textCycleAnimRef.current?.kill();

        const currentLabel = opening ? 'Menu' : 'Close';
        const targetLabel = opening ? 'Close' : 'Menu';
        const cycles = 3;
        const seq = [currentLabel];
        let last = currentLabel;
        for (let i = 0; i < cycles; i++) {
            last = last === 'Menu' ? 'Close' : 'Menu';
            seq.push(last);
        }
        if (last !== targetLabel) seq.push(targetLabel);
        seq.push(targetLabel);
        setTextLines(seq);

        gsap.set(inner, { yPercent: 0 });
        const lineCount = seq.length;
        const finalShift = ((lineCount - 1) / lineCount) * 100;
        textCycleAnimRef.current = gsap.to(inner, {
            yPercent: -finalShift,
            duration: 0.5 + lineCount * 0.07,
            ease: 'power4.out'
        });
    }, []);

    const closeMenu = useCallback(() => {
        if (!openRef.current) return;

        const target = false;
        openRef.current = target;
        setOpen(target);
        onMenuClose?.();
        playClose();
        animateIcon(target);
        animateColor(target);
        animateText(target);
    }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

    React.useEffect(() => {
        if (toggleBtnRef.current) {
            if (changeMenuColorOnOpen) {
                const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
                gsap.set(toggleBtnRef.current, { color: targetColor });
            } else {
                gsap.set(toggleBtnRef.current, { color: menuButtonColor });
            }
        }
    }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

    // Handle clicks outside the menu and escape key to close it
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!openRef.current) return;

            const target = event.target as Element;

            // Check if click is outside the menu wrapper and panel
            if (wrapperRef.current && panelRef.current &&
                !wrapperRef.current.contains(target) &&
                !panelRef.current.contains(target)) {
                closeMenu();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && openRef.current) {
                closeMenu();
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [open, closeMenu]);

    const handleItemClick = useCallback((item: MenuItem) => {
        if (onItemClick) {
            onItemClick(item);
        }
        // Close menu after clicking an item
        const target = false;
        openRef.current = target;
        setOpen(target);
        onMenuClose?.();
        playClose();
        animateIcon(target);
        animateColor(target);
        animateText(target);
    }, [onItemClick, onMenuClose, playClose, animateIcon, animateColor, animateText]);

    const animateButtonHover = useCallback((isHovering: boolean) => {
        const button = toggleBtnRef.current;
        const plusH = plusHRef.current;
        const plusV = plusVRef.current;
        if (!button) return;

        if (isHovering) {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "back.out(1.7)",
                overwrite: "auto"
            });

            // Add subtle bounce to icon lines
            if (plusH && plusV) {
                gsap.to([plusH, plusV], {
                    scale: 1.1,
                    duration: 0.2,
                    ease: "back.out(2)",
                    overwrite: "auto"
                });
            }
        } else {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)",
                overwrite: "auto"
            });

            // Reset icon lines
            if (plusH && plusV) {
                gsap.to([plusH, plusV], {
                    scale: 1,
                    duration: 0.2,
                    ease: "back.out(2)",
                    overwrite: "auto"
                });
            }
        }
    }, []);

    const animateButtonClick = useCallback(() => {
        const button = toggleBtnRef.current;
        const plusH = plusHRef.current;
        const plusV = plusVRef.current;
        if (!button) return;

        // Quick scale down then bounce back
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out",
            overwrite: "auto",
            onComplete: () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.4,
                    ease: "back.out(2.5)",
                    overwrite: "auto"
                });
            }
        });

        // Add extra bounce to icon lines on click
        if (plusH && plusV) {
            gsap.to([plusH, plusV], {
                scale: 0.8,
                duration: 0.1,
                ease: "power2.out",
                overwrite: "auto",
                onComplete: () => {
                    gsap.to([plusH, plusV], {
                        scale: 1.2,
                        duration: 0.3,
                        ease: "back.out(3)",
                        overwrite: "auto"
                    });
                }
            });
        }
    }, []);

    const toggleMenu = useCallback(() => {
        animateButtonClick();

        const target = !openRef.current;
        openRef.current = target;
        setOpen(target);
        if (target) {
            onMenuOpen?.();
            playOpen();
        } else {
            onMenuClose?.();
            playClose();
        }
        animateIcon(target);
        animateColor(target);
        animateText(target);
    }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose, animateButtonClick]);

    return (
        <div
            ref={wrapperRef}
            className={(className ? className + ' ' : '') + 'staggered-menu-wrapper'}
            style={accentColor ? { ['--sm-accent' as any]: accentColor } : undefined}
            data-position={position}
            data-open={open || undefined}
        >
            <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
                {(() => {
                    const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
                    let arr = [...raw];
                    if (arr.length >= 3) {
                        const mid = Math.floor(arr.length / 2);
                        arr.splice(mid, 1);
                    }
                    return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
                })()}
            </div>
            <div className="staggered-menu-header" aria-label="Main navigation header">
                <button
                    ref={toggleBtnRef}
                    className="sm-toggle"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    aria-controls="staggered-menu-panel"
                    onClick={toggleMenu}
                    onMouseEnter={() => animateButtonHover(true)}
                    onMouseLeave={() => animateButtonHover(false)}
                    type="button"
                >
                    <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
                        <span ref={textInnerRef} className="sm-toggle-textInner">
                            {textLines.map((l, i) => (
                                <span className="sm-toggle-line" key={i}>
                                    {l}
                                </span>
                            ))}
                        </span>
                    </span>
                    <span ref={iconRef} className="sm-icon" aria-hidden="true">
                        <span ref={plusHRef} className="sm-icon-line" />
                        <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
                    </span>
                </button>
            </div>

            <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
                <div className="sm-panel-inner">
                    <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
                        {items && items.length ? (
                            items.map((it, idx) => (
                                <li className="sm-panel-itemWrap" key={it.label + idx}>
                                    <button
                                        className="sm-panel-item"
                                        onClick={() => handleItemClick(it)}
                                        aria-label={it.ariaLabel}
                                        data-index={idx + 1}
                                    >
                                        <span className="sm-panel-itemLabel">{it.label}</span>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li className="sm-panel-itemWrap" aria-hidden="true">
                                <span className="sm-panel-item">
                                    <span className="sm-panel-itemLabel">No items</span>
                                </span>
                            </li>
                        )}
                    </ul>
                    {displaySocials && socialItems && socialItems.length > 0 && (
                        <div className="sm-socials" aria-label="Social links">
                            <h3 className="sm-socials-title">Socials</h3>
                            <ul className="sm-socials-list" role="list">
                                {socialItems.map((s, i) => (
                                    <li key={s.label + i} className="sm-socials-item">
                                        <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                                            {s.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
};

export default StaggeredMenu;
