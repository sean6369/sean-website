"use client";
import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a Modal");
    }
    return context;
};

interface ModalProps {
    children: React.ReactNode;
}

export const Modal = ({ children }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ModalContext.Provider>
    );
};

interface ModalTriggerProps {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
}

export const ModalTrigger = ({ children, className, asChild }: ModalTriggerProps) => {
    const { setIsOpen } = useModal();

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: () => setIsOpen(true),
            className: `${children.props.className || ""} ${className || ""}`,
        });
    }

    return (
        <button
            onClick={() => setIsOpen(true)}
            className={className}
        >
            {children}
        </button>
    );
};

interface ModalBodyProps {
    children: React.ReactNode;
}

export const ModalBody = ({ children }: ModalBodyProps) => {
    const { isOpen, setIsOpen } = useModal();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        className="relative bg-background border border-border rounded-xl shadow-lg max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-surface rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

interface ModalContentProps {
    children: React.ReactNode;
    className?: string;
}

export const ModalContent = ({ children, className }: ModalContentProps) => {
    return (
        <div className={`p-6 ${className || ""}`}>
            {children}
        </div>
    );
};

interface ModalFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
    return (
        <div className={`px-6 py-4 border-t border-border flex gap-3 ${className || ""}`}>
            {children}
        </div>
    );
};

