'use client'

import { useEffect, useState } from 'react'

interface MousePosition {
    x: number
    y: number
}

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        }

        const handleMouseEnter = (e: MouseEvent) => {
            try {
                const target = e.target

                // Check if target is a valid HTMLElement
                if (!target || typeof target !== 'object' || !('tagName' in target)) {
                    setIsHovering(false)
                    return
                }

                const element = target as HTMLElement

                const isClickable =
                    element.tagName === 'A' ||
                    element.tagName === 'BUTTON' ||
                    (element.getAttribute && element.getAttribute('role') === 'button') ||
                    (element.classList && element.classList.contains('cursor-pointer')) ||
                    (element.closest && element.closest('a, button, [role="button"], .cursor-pointer') !== null) ||
                    // Form fields detection
                    element.tagName === 'INPUT' ||
                    element.tagName === 'TEXTAREA' ||
                    element.tagName === 'SELECT' ||
                    (element.getAttribute && element.getAttribute('contenteditable') === 'true') ||
                    (element.closest && element.closest('input, textarea, select, [contenteditable="true"]') !== null) ||
                    // Icon detection - SVG icons and their containers
                    element.tagName === 'SVG' ||
                    element.tagName === 'PATH' ||
                    element.tagName === 'CIRCLE' ||
                    element.tagName === 'RECT' ||
                    element.tagName === 'LINE' ||
                    element.tagName === 'POLYGON' ||
                    element.tagName === 'POLYLINE' ||
                    (element.closest && element.closest('svg, [data-icon], .icon, .social-icon, .social-icon-link') !== null) ||
                    // Video controls detection
                    (element.closest && element.closest('video, iframe') !== null) ||
                    (element.closest && element.closest('.ytp-chrome-top, .ytp-chrome-bottom, .ytp-progress-bar, .ytp-scrubber-container, .ytp-time-display, .ytp-play-button, .ytp-mute-button, .ytp-volume-panel, .ytp-fullscreen-button') !== null)

                setIsHovering(isClickable)
            } catch (error) {
                // Silently handle any errors and set hover to false
                setIsHovering(false)
            }
        }

        const handleMouseLeave = () => {
            setIsHovering(false)
        }

        const handleMouseOut = () => {
            setIsVisible(false)
        }

        const handleScroll = () => {
            // Keep cursor visible during scroll
            setIsVisible(true)
        }

        const handleMouseLeaveDocument = () => {
            setIsVisible(false)
        }

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseenter', handleMouseEnter, true)
        document.addEventListener('mouseleave', handleMouseLeave, true)
        document.addEventListener('mouseout', handleMouseOut)
        document.addEventListener('scroll', handleScroll, true)
        document.addEventListener('mouseleave', handleMouseLeaveDocument)

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseenter', handleMouseEnter, true)
            document.removeEventListener('mouseleave', handleMouseLeave, true)
            document.removeEventListener('mouseout', handleMouseOut)
            document.removeEventListener('scroll', handleScroll, true)
            document.removeEventListener('mouseleave', handleMouseLeaveDocument)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            className="custom-cursor"
            style={{
                left: mousePosition.x,
                top: mousePosition.y,
                transform: 'translate(-50%, -50%)',
            }}
        >
            <div className={`custom-cursor__outer ${isHovering ? 'custom-cursor__outer--hover' : ''}`} />
            {isHovering && <div className="custom-cursor__inner" />}
        </div>
    )
}
