import { Variants } from 'framer-motion'

/**
 * Common animation variants for consistent motion across components
 */
export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
}

export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 }
}

export const fadeInLeft: Variants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 }
}

export const fadeInRight: Variants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 }
}

export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
}

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const staggerItem: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
}

/**
 * Common transition configurations
 */
export const defaultTransition = {
    duration: 0.3,
    ease: [0.25, 0.4, 0.25, 1]
}

export const fastTransition = {
    duration: 0.2,
    ease: [0.25, 0.4, 0.25, 1]
}

export const slowTransition = {
    duration: 0.6,
    ease: [0.25, 0.4, 0.25, 1]
}

/**
 * Hover animations
 */
export const hoverScale = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: defaultTransition
}

export const hoverLift = {
    whileHover: { y: -5 },
    transition: defaultTransition
}

/**
 * Button animations
 */
export const buttonHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }
}

/**
 * Modal animations
 */
export const modalBackdrop = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}

export const modalContent = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 }
}
