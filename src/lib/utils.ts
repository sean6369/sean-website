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
    const offset = 80 // Adjust this value based on your navbar height
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - offset

    // Use Lenis if available, otherwise fallback to native smooth scroll
    if (lenisInstance) {
      lenisInstance.scrollTo(sectionTop, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease-in-out
        offset: 0,
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
