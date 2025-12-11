import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type Lenis from "lenis"

// Module-level reference to Lenis instance (set by LenisProvider)
let lenisInstance: Lenis | null = null

export function setLenisInstance(lenis: Lenis | null) {
  lenisInstance = lenis
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId)
  if (section) {
    const navbarOffset = 120 // Match the offset used in navigation detection
    const sectionOffsets: Record<string, number> = {
      about: 80, // Scroll slightly into the About section
      milestones: 140, // Scroll further into Milestones
      projects: 80, // Scroll slightly into Projects section
    }
    const extraOffset = sectionOffsets[sectionId] ?? 0

    // For home section, scroll to top
    if (sectionId === 'home') {
      const targetScroll = 0
      if (lenisInstance) {
        lenisInstance.scrollTo(targetScroll, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          offset: 0,
        })
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        })
      }
      return
    }

    // Calculate position using layout (offsetTop) to avoid transform-induced drift
    // Framer-motion transforms (like y) change getBoundingClientRect but not layout,
    // so offsetTop gives a stable reference for scrolling both up and down.
    const sectionTop = Math.max(0, (section as HTMLElement).offsetTop - navbarOffset + extraOffset)

    // Use Lenis if available, otherwise fallback to native smooth scroll
    if (lenisInstance) {
      lenisInstance.scrollTo(sectionTop, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-in-out
        offset: 0,
        immediate: false,
      })
    } else {
      // Fallback to native smooth scroll
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      })
    }
  }
}
