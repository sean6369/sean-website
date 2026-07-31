"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { useLenis } from "@/components/providers/LenisProvider";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  scrollProgress?: number;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  scrollProgress?: number;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const lenis = useLenis();

  // Use Lenis scroll events (throttled, setState only when progress changes)
  useEffect(() => {
    if (!lenis) return;

    const THROTTLE_MS = 40;
    let rafId: number | null = null;
    let lastUpdate = 0;
    let pendingScroll: number | null = null;
    let lastProgress = -1;

    const applyProgress = (scroll: number) => {
      const progress = Math.min(scroll / 300, 1);
      const rounded = Math.round(progress * 100) / 100;
      if (rounded !== lastProgress) {
        lastProgress = rounded;
        setScrollProgress(rounded);
      }
    };

    const handleScroll = ({ scroll }: { scroll: number; limit: number }) => {
      pendingScroll = scroll;
      const now = performance.now();
      if (rafId !== null) return;
      if (now - lastUpdate >= THROTTLE_MS) {
        lastUpdate = now;
        applyProgress(scroll);
        pendingScroll = null;
        return;
      }
      rafId = requestAnimationFrame(() => {
        rafId = null;
        lastUpdate = performance.now();
        if (pendingScroll !== null) {
          applyProgress(pendingScroll);
          pendingScroll = null;
        }
      });
    };

    lenis.on('scroll', handleScroll);
    applyProgress(lenis.scroll);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      lenis.off('scroll', handleScroll);
    };
  }, [lenis]);

  // Fallback to Framer Motion scroll for compatibility
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!lenis) {
      // Only use Framer Motion if Lenis is not available
      const progress = Math.min(latest / 300, 1);
      setScrollProgress(progress);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ scrollProgress?: number }>,
            { scrollProgress },
          )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, scrollProgress = 0 }: NavBodyProps) => {
  // Calculate width from 100% to 40% based on scroll progress
  const widthPercentage = 100 - (scrollProgress * 60); // 100% -> 40%
  // Calculate vertical offset from 0 to 20px
  const yOffset = scrollProgress * 20; // 0px -> 20px
  // Calculate blur from 0 to 12px based on scroll progress
  const blurAmount = scrollProgress * 12; // 0px -> 12px
  // Calculate background opacity from 0 to 0.7
  const bgOpacity = scrollProgress * 0.7; // 0 -> 0.7
  // Calculate border opacity from 0 to 0.2 (light) or 0.5 (dark)
  const borderOpacityLight = scrollProgress * 0.2;
  const borderOpacityDark = scrollProgress * 0.5;
  // Calculate shadow opacity
  const shadowOpacity = scrollProgress;

  return (
    <motion.div
      animate={{
        width: `${widthPercentage}%`,
        y: yOffset,
      }}
      transition={{
        type: "spring",
        stiffness: 550,
        damping: 80,
        mass: 0.1,
      }}
      style={{
        minWidth: "800px",
        backdropFilter: `blur(${blurAmount}px) saturate(${100 + scrollProgress * 80}%)`,
        WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${100 + scrollProgress * 80}%)`,
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex",
        className,
      )}
    >
      {/* Light mode background */}
      <div
        className="absolute inset-0 rounded-full dark:hidden transition-opacity duration-150"
        style={{
          backgroundColor: `rgb(255 255 255 / ${bgOpacity})`,
        }}
      />
      {/* Dark mode background */}
      <div
        className="absolute inset-0 rounded-full hidden dark:block transition-opacity duration-150"
        style={{
          backgroundColor: `rgb(10 10 11 / ${bgOpacity})`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full border transition-opacity duration-150"
        style={{
          borderColor: `rgb(255 255 255 / ${borderOpacityLight})`,
          opacity: scrollProgress,
        }}
      />
      <div
        className="absolute inset-0 rounded-full dark:border transition-opacity duration-150"
        style={{
          borderColor: `rgb(64 64 70 / ${borderOpacityDark})`,
          opacity: scrollProgress,
        }}
      />
      <div
        className="absolute inset-0 rounded-full shadow-lg shadow-black/5 dark:shadow-black/20 transition-opacity duration-150"
        style={{
          opacity: shadowOpacity,
        }}
      />
      <div className="relative z-10 flex w-full items-center justify-between">
        {children}
      </div>
    </motion.div>
  );
};


export const MobileNav = ({ children, className, scrollProgress = 0 }: MobileNavProps) => {
  // Calculate width from 95% to 90% based on scroll progress
  const widthPercentage = 95 - (scrollProgress * 5); // 95% -> 90%
  // Calculate vertical offset from 0 to 20px
  const yOffset = scrollProgress * 20; // 0px -> 20px
  // Calculate blur from 0 to 12px based on scroll progress
  const blurAmount = scrollProgress * 12; // 0px -> 12px
  // Calculate background opacity from 0 to 0.7
  const bgOpacity = scrollProgress * 0.7; // 0 -> 0.7
  // Calculate border opacity from 0 to 0.2 (light) or 0.5 (dark)
  const borderOpacityLight = scrollProgress * 0.2;
  const borderOpacityDark = scrollProgress * 0.5;
  // Calculate shadow opacity
  const shadowOpacity = scrollProgress;

  return (
    <motion.div
      animate={{
        width: `${widthPercentage}%`,
        y: yOffset,
      }}
      transition={{
        type: "spring",
        stiffness: 450,
        damping: 35,
        mass: 0.3,
      }}
      style={{
        backdropFilter: `blur(${blurAmount}px) saturate(${100 + scrollProgress * 80}%)`,
        WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${100 + scrollProgress * 80}%)`,
      }}
      className={cn(
        "relative z-50 mx-auto flex max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-3 py-2 lg:hidden rounded-full",
        className,
      )}
    >
      {/* Light mode background */}
      <div
        className="absolute inset-0 rounded-full dark:hidden transition-opacity duration-150"
        style={{
          backgroundColor: `rgb(255 255 255 / ${bgOpacity})`,
        }}
      />
      {/* Dark mode background */}
      <div
        className="absolute inset-0 rounded-full hidden dark:block transition-opacity duration-150"
        style={{
          backgroundColor: `rgb(10 10 11 / ${bgOpacity})`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full border transition-opacity duration-150"
        style={{
          borderColor: `rgb(255 255 255 / ${borderOpacityLight})`,
          opacity: scrollProgress,
        }}
      />
      <div
        className="absolute inset-0 rounded-full dark:border transition-opacity duration-150"
        style={{
          borderColor: `rgb(64 64 70 / ${borderOpacityDark})`,
          opacity: scrollProgress,
        }}
      />
      <div
        className="absolute inset-0 rounded-full shadow-lg shadow-black/5 dark:shadow-black/20 transition-opacity duration-150"
        style={{
          opacity: shadowOpacity,
        }}
      />
      <div className="relative z-10 flex w-full items-center justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};




