import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToSection(sectionId: string) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offset = 80 // Adjust this value based on your navbar height
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    })
  }
}
