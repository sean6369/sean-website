'use client'

import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react'
import { useState } from 'react'

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))

        setSubmitted(true)
        setIsSubmitting(false)
        setFormData({ name: '', email: '', subject: '', message: '' })

        // Reset success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000)
    }

    return (
        <section id="contact" className="pt-16 md:pt-24 lg:pt-32 pb-0 relative">
            {/* Bottom blur transition */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/80 via-background/40 to-transparent backdrop-blur-lg pointer-events-none"></div>
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

                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg"
                                >
                                    <p className="text-success text-sm font-medium">
                                        Thank you! Your message has been sent successfully.
                                    </p>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02 }}
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
                        <div>
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
                                        className="p-3 bg-surface hover:bg-surface-secondary rounded-lg transition-all duration-300 group"
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
        </section>
    )
}

