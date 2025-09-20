"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StepperProps {
    steps: Array<{
        id: string
        label: string
        step: number
    }>
    currentStep: number
    onStepClick: (stepId: string) => void
    className?: string
}

interface StepperItemProps {
    step: {
        id: string
        label: string
        step: number
    }
    isActive: boolean
    isCompleted: boolean
    isPending: boolean
    onClick: () => void
    index: number
}

const StepperItem: React.FC<StepperItemProps> = ({
    step,
    isActive,
    isCompleted,
    isPending,
    onClick,
    index
}) => {
    return (
        <motion.div
            className="flex flex-col items-center cursor-pointer mr-2 sm:mr-3 md:mr-4 lg:mr-4 last:mr-0 group min-w-0 flex-shrink-0"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay: index * 0.01,
                type: "spring",
                stiffness: 300,
                damping: 20
            }}
            whileHover={{
                scale: 1.02,
                y: -2,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                }
            }}
            whileTap={{
                scale: 0.98,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 600,
                    damping: 20
                }
            }}
            onClick={onClick}
        >
            {/* Step Indicator Line */}
            <motion.div
                className={cn(
                    "relative w-12 sm:w-16 md:w-20 lg:w-24 h-1.5 sm:h-2 md:h-2 lg:h-2 rounded-full transition-all duration-300 mb-1.5 sm:mb-2 md:mb-2 lg:mb-2 overflow-hidden touch-manipulation",
                    isActive
                        ? "bg-primary shadow-md shadow-primary/20"
                        : isCompleted
                            ? "bg-secondary shadow-sm shadow-secondary/15"
                            : "bg-surface-secondary hover:bg-primary/60"
                )}
                whileHover={{
                    scale: 1.05,
                    y: -1,
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                    }
                }}
                whileTap={{
                    scale: 0.95,
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 600,
                        damping: 20
                    }
                }}
                layout
            >
                {/* Animated Background Shimmer - Reduced for mobile performance */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut"
                    }}
                />

                {/* Active Step Pulsing Glow - Simplified for mobile */}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-primary/25"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.25, 0.5, 0.25]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}

                {/* Hover Glow Effect - Reduced for mobile */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-primary/15"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{
                        scale: 1.2,
                        opacity: 0.8,
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 12
                        }
                    }}
                />

                {/* Click Ripple Effect - Simplified for mobile */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{
                        scale: 1.1,
                        opacity: [0, 0.4, 0],
                        transition: {
                            duration: 0.2,
                            ease: "easeOut"
                        }
                    }}
                />
            </motion.div>

            {/* Step Label */}
            <motion.span
                className={cn(
                    "text-xs sm:text-sm md:text-base lg:text-base font-medium whitespace-nowrap transition-all duration-200 relative px-1 py-0.5 touch-manipulation",
                    isActive
                        ? "text-primary font-semibold"
                        : isCompleted
                            ? "text-secondary"
                            : "text-foreground-secondary group-hover:text-primary"
                )}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    delay: index * 0.01 + 0.03,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
                whileHover={{
                    y: -2,
                    scale: 1.02,
                    transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 15
                    }
                }}
                whileTap={{
                    y: 0,
                    scale: 0.98,
                    transition: {
                        type: "spring",
                        stiffness: 600,
                        damping: 20
                    }
                }}
            >
                {/* Text Glow Effect - Simplified for mobile */}
                <motion.div
                    className="absolute inset-0 bg-primary/8 rounded-sm blur-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileHover={{
                        opacity: 0.8,
                        scale: 1.05,
                        transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 12
                        }
                    }}
                />
                <span className="relative z-10">{step.label}</span>
            </motion.span>
        </motion.div>
    )
}

export const Stepper: React.FC<StepperProps> = ({
    steps,
    currentStep,
    onStepClick,
    className
}) => {
    const currentStepIndex = steps.findIndex(step => step.step === currentStep)

    return (
        <div className={cn("w-full", className)}>
            {/* Stepper Steps Container with horizontal scroll for mobile */}
            <div className="flex items-start overflow-x-auto scrollbar-hide pb-2 -mb-2">
                <div className="flex items-start min-w-max px-1 max-w-full">
                    {steps.map((step, index) => {
                        const isActive = step.step === currentStep
                        const isCompleted = index < currentStepIndex
                        const isPending = index > currentStepIndex

                        return (
                            <StepperItem
                                key={step.id}
                                step={step}
                                isActive={isActive}
                                isCompleted={isCompleted}
                                isPending={isPending}
                                onClick={() => onStepClick(step.id)}
                                index={index}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Stepper
