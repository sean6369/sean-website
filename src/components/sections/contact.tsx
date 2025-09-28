'use client'

import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

const contactInfo = [
    {
        icon: Mail,
        label: 'Email',
        value: 'seanleesukiat@gmail.com',
        href: 'mailto:seanleesukiat@gmail.com',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+65 90716345',
        href: 'tel:+6590716345',
    },
]

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/sean6369',
        icon: Github,
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/lee-su-kiat-sean-19211a33b',
        icon: Linkedin,
    },
]

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submission started')
        setIsSubmitting(true)
        setError('')

        try {
            // Check if environment variables are available
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID
            const confirmationTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

            // Debug: Log environment variables (remove this after debugging)
            console.log('Environment variables check:')
            console.log('Service ID:', serviceId ? 'Found' : 'Missing', serviceId)
            console.log('Template ID:', templateId ? 'Found' : 'Missing', templateId)
            console.log('Confirmation Template ID:', confirmationTemplateId ? 'Found' : 'Missing', confirmationTemplateId)
            console.log('Public Key:', publicKey ? 'Found' : 'Missing', publicKey)

            // Debug: Show all NEXT_PUBLIC_ variables
            console.log('All NEXT_PUBLIC_ variables:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')))

            if (!serviceId || !templateId || !confirmationTemplateId || !publicKey) {
                throw new Error('EmailJS configuration is missing. Please check your environment variables.')
            }

            // Initialize EmailJS with your public key
            emailjs.init(publicKey)

            // Prepare template parameters for notification email (to you)
            const notificationParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'seanleesukiat@gmail.com', // Your email
                current_date: new Date().toLocaleString(),
                logo_url: `https://sean-website.vercel.app/images/sean logo.png`, // Your logo URL
            }

            // Prepare template parameters for confirmation email (to sender)
            const confirmationParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: formData.email, // Sender's email
                current_date: new Date().toLocaleString(),
                logo_url: `https://sean-website.vercel.app/images/sean logo.png`, // Your logo URL
            }

            console.log('Sending notification email with params:', notificationParams)

            // Send notification email to you first
            console.log('Attempting to send notification email...')
            const notificationResult = await emailjs.send(
                serviceId,
                templateId, // Notification template
                notificationParams
            )

            console.log('Notification email result:', notificationResult)

            if (notificationResult.status === 200) {
                console.log('Notification email sent successfully, now sending confirmation...')
                console.log('Sending confirmation email with params:', confirmationParams)

                // Send confirmation email to sender
                const confirmationResult = await emailjs.send(
                    serviceId,
                    confirmationTemplateId, // Confirmation template
                    confirmationParams
                )

                console.log('Confirmation email result:', confirmationResult)

                if (confirmationResult.status === 200) {
                    setSubmitted(true)
                    setFormData({ name: '', email: '', subject: '', message: '' })
                } else {
                    throw new Error(`Confirmation email failed with status: ${confirmationResult.status}`)
                }
            } else {
                throw new Error(`Notification email failed with status: ${notificationResult.status}`)
            }
        } catch (err) {
            console.error('EmailJS Error Details:', err)
            console.error('Error type:', typeof err)
            console.error('Error message:', err instanceof Error ? err.message : 'Unknown error')
            console.error('Error stack:', err instanceof Error ? err.stack : 'No stack trace')

            let errorMessage = 'Something went wrong. Please try again.'

            if (err instanceof Error) {
                if (err.message.includes('Invalid email')) {
                    errorMessage = 'Please enter a valid email address.'
                } else if (err.message.includes('Template')) {
                    errorMessage = 'Email template error. Please check your EmailJS configuration.'
                } else if (err.message.includes('Service')) {
                    errorMessage = 'Email service error. Please check your EmailJS service setup.'
                } else if (err.message.includes('Public key')) {
                    errorMessage = 'EmailJS authentication error. Please check your public key.'
                } else {
                    errorMessage = `Error: ${err.message}`
                }
            }

            setError(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="pt-16 md:pt-24 lg:pt-32 pb-0 relative">
            {/* Bottom blur transition for smooth footer connection */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/60 to-transparent backdrop-blur-sm pointer-events-none"></div>
            <div className="container-custom pb-16 md:pb-24 lg:pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
                    <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
                        Have a project in mind or just want to chat? I'd love to hear from you.
                        Let's create something amazing together.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="glass-effect p-8 rounded-xl">
                            <h3 className="text-2xl font-bold mb-6 text-foreground">
                                Send me a message
                            </h3>


                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                                >
                                    <p className="text-red-600 text-sm font-medium">
                                        {error}
                                    </p>
                                </motion.div>
                            )}

                            <form onSubmit={(e) => {
                                console.log('Form onSubmit triggered')
                                handleSubmit(e)
                            }} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-surface border border-surface-secondary rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-foreground placeholder:text-foreground-tertiary"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-surface border border-surface-secondary rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-foreground placeholder:text-foreground-tertiary"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-surface border border-surface-secondary rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-foreground placeholder:text-foreground-tertiary"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-surface border border-surface-secondary rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 text-foreground placeholder:text-foreground-tertiary resize-none"
                                        placeholder="Tell me about your project or idea..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full button-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-foreground">
                                Let's connect
                            </h3>
                            <p className="text-foreground-secondary leading-relaxed mb-8">
                                I'm always open to new opportunities, creative projects, ideas or potential collaborations, or if you just want to say hello, feel free to reach out!
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={info.label}
                                    href={info.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: "easeOut"
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="flex items-center gap-4 p-4 glass-effect rounded-lg hover:border-primary/20 transition-all duration-300 group"
                                >
                                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                                        <info.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-foreground-secondary">
                                            {info.label}
                                        </div>
                                        <div className="text-foreground font-medium">
                                            {info.value}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="relative z-10">
                            <h4 className="text-lg font-semibold mb-4 text-foreground">
                                Follow me
                            </h4>
                            <div className="flex gap-4">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-3 bg-surface hover:bg-surface-secondary rounded-lg transition-all duration-300 group relative z-10"
                                        aria-label={link.name}
                                    >
                                        <link.icon className="w-5 h-5 text-foreground-secondary group-hover:text-primary transition-colors duration-300" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>

            {/* Success Popup */}
            {submitted && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backdropFilter: 'blur(16px)' }}
                >
                    {/* Glass Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-black/30 dark:bg-black/50"
                    />

                    {/* Glass Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 30 }}
                        transition={{
                            type: "spring",
                            duration: 0.6,
                            bounce: 0.3
                        }}
                        className="relative bg-white/20 dark:bg-white/10 backdrop-blur-2xl border border-white/30 dark:border-white/20 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none"
                        style={{
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                delay: 0.2,
                                type: "spring",
                                duration: 0.7,
                                bounce: 0.4
                            }}
                            className="w-20 h-20 bg-emerald-500/20 dark:bg-emerald-400/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/40 dark:border-emerald-400/50 backdrop-blur-sm shadow-lg shadow-emerald-500/20"
                        >
                            <motion.svg
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                                className="w-10 h-10 text-emerald-600 dark:text-emerald-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <motion.path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </motion.svg>
                        </motion.div>

                        {/* Success Message */}
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                            className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
                        >
                            Message Sent!
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                            className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed"
                        >
                            Thank you for reaching out! I'll get back to you as soon as possible.
                        </motion.p>

                        {/* Theme-aware Glass Close Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{
                                scale: 0.95,
                                transition: { duration: 0.1 }
                            }}
                            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                            onClick={() => setSubmitted(false)}
                            className="group relative bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 border border-white/30 dark:border-white/20 text-gray-900 dark:text-white px-8 py-3.5 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl overflow-hidden"
                        >
                            {/* Button gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                            {/* Button text */}
                            <span className="relative z-10">Done</span>

                            {/* Shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </section>
    )
}

