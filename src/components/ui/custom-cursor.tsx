'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface MousePosition {
    x: number
    y: number
}

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const rafRef = useRef<number>()

    // Throttled mouse move handler for better performance
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
        }

        rafRef.current = requestAnimationFrame(() => {
            setMousePosition({ x: e.clientX, y: e.clientY })
            setIsVisible(true)
        })
    }, [])

    // Optimized hover detection with caching
    const handleMouseEnter = useCallback((e: MouseEvent) => {
        try {
            const target = e.target

            // Quick check for common clickable elements first
            if (!target || typeof target !== 'object' || !('tagName' in target)) {
                setIsHovering(false)
                return
            }

            const element = target as HTMLElement
            const tagName = element.tagName

            // Fast path for common clickable elements
            if (tagName === 'A' || tagName === 'BUTTON' || tagName === 'INPUT' ||
                tagName === 'TEXTAREA' || tagName === 'SELECT' || tagName === 'SVG') {
                setIsHovering(true)
                return
            }

            // Check for cursor-pointer class (most common)
            if (element.classList && element.classList.contains('cursor-pointer')) {
                setIsHovering(true)
                return
            }

            // Only do expensive checks if needed
            const isClickable =
                (element.getAttribute && element.getAttribute('role') === 'button') ||
                (element.closest && element.closest('a, button, [role="button"], .cursor-pointer, svg, input, textarea, select') !== null) ||
                // Icon detection
                tagName === 'PATH' || tagName === 'CIRCLE' || tagName === 'RECT' ||
                tagName === 'LINE' || tagName === 'POLYGON' || tagName === 'POLYLINE' ||
                (element.closest && element.closest('[data-icon], .icon, .social-icon, .social-icon-link') !== null) ||
                // Video controls
                (element.closest && element.closest('video, iframe') !== null) ||
                (element.closest && element.closest('.ytp-chrome-top, .ytp-chrome-bottom, .ytp-progress-bar, .ytp-scrubber-container, .ytp-time-display, .ytp-play-button, .ytp-mute-button, .ytp-volume-panel, .ytp-fullscreen-button') !== null)

            setIsHovering(isClickable)
        } catch (error) {
            setIsHovering(false)
        }
    }, [])

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false)
    }, [])

    const handleMouseOut = useCallback(() => {
        setIsVisible(false)
    }, [])

    const handleScroll = useCallback(() => {
        setIsVisible(true)
    }, [])

    const handleMouseLeaveDocument = useCallback(() => {
        setIsVisible(false)
    }, [])

    useEffect(() => {
        // Add event listeners with passive where possible
        document.addEventListener('mousemove', handleMouseMove, { passive: true })
        document.addEventListener('mouseenter', handleMouseEnter, true)
        document.addEventListener('mouseleave', handleMouseLeave, true)
        document.addEventListener('mouseout', handleMouseOut)
        document.addEventListener('scroll', handleScroll, { passive: true })
        document.addEventListener('mouseleave', handleMouseLeaveDocument)

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseenter', handleMouseEnter, true)
            document.removeEventListener('mouseleave', handleMouseLeave, true)
            document.removeEventListener('mouseout', handleMouseOut)
            document.removeEventListener('scroll', handleScroll)
            document.removeEventListener('mouseleave', handleMouseLeaveDocument)
        }
    }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseOut, handleScroll, handleMouseLeaveDocument])

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
