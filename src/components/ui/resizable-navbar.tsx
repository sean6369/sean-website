"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  scrollProgress?: number;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  scrollProgress?: number;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Calculate scroll progress from 0 to 1 based on scroll position
    // Starts at 0px, fully scrolled at 300px
    const progress = Math.min(latest / 300, 1);
    setScrollProgress(progress);
  });

  const visible = scrollProgress > 0.33; // For other effects like shadows

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean; scrollProgress?: number }>,
            { visible, scrollProgress },
          )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible, scrollProgress = 0 }: NavBodyProps) => {
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
        stiffness: 200,
        damping: 50,
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
        className="absolute inset-0 rounded-full dark:hidden transition-opacity duration-300"
        style={{
          backgroundColor: `rgb(255 255 255 / ${bgOpacity})`,
        }}
      />
      {/* Dark mode background */}
      <div
        className="absolute inset-0 rounded-full hidden dark:block transition-opacity duration-300"
        style={{
          backgroundColor: `rgb(10 10 11 / ${bgOpacity})`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full border transition-opacity duration-300"
        style={{
          borderColor: `rgb(255 255 255 / ${borderOpacityLight})`,
          opacity: scrollProgress,
        }}
      />
      <div
        className="absolute inset-0 rounded-full dark:border transition-opacity duration-300"
        style={{
          borderColor: `rgb(64 64 70 / ${borderOpacityDark})`,
          opacity: scrollProgress,
        }}
      />
      <div
        className="absolute inset-0 rounded-full shadow-lg shadow-black/5 dark:shadow-black/20 transition-opacity duration-300"
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

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible, scrollProgress = 0 }: MobileNavProps) => {
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
        stiffness: 200,
        damping: 50,
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
        className="absolute inset-0 rounded-full dark:hidden transition-opacity duration-300"
        style={{
          backgroundColor: `rgb(255 255 255 / ${bgOpacity})`,
        }}
      />
      {/* Dark mode background */}
      <div
        className="absolute inset-0 rounded-full hidden dark:block transition-opacity duration-300"
        style={{
          backgroundColor: `rgb(10 10 11 / ${bgOpacity})`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full border transition-opacity duration-300"
        style={{
          borderColor: `rgb(255 255 255 / ${borderOpacityLight})`,
          opacity: scrollProgress,
        }}
      />
      <div
        className="absolute inset-0 rounded-full dark:border transition-opacity duration-300"
        style={{
          borderColor: `rgb(64 64 70 / ${borderOpacityDark})`,
          opacity: scrollProgress,
        }}
      />
      <div
        className="absolute inset-0 rounded-full shadow-lg shadow-black/5 dark:shadow-black/20 transition-opacity duration-300"
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

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">Startup</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
