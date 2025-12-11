'use client'

import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { contactFormSchema } from '@/lib/validation'
import * as z from 'zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Zod schema for form validation
type ContactFormValues = z.infer<typeof contactFormSchema>

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
    // Initialize form with react-hook-form and zod validation
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    })

    const onSubmit = async (data: ContactFormValues) => {
        // Show loading toast
        const loadingToast = toast.loading('Sending your message...')

        try {
            // Check if environment variables are available
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID
            const confirmationTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

            if (!serviceId || !templateId || !confirmationTemplateId || !publicKey) {
                throw new Error('EmailJS configuration is missing. Please check your environment variables.')
            }

            // Initialize EmailJS with your public key
            emailjs.init(publicKey)

            // Prepare template parameters for notification email (to you)
            const notificationParams = {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                to_email: 'seanleesukiat@gmail.com',
                current_date: new Date().toLocaleString(),
                logo_url: `https://sean-website.vercel.app/images/sean logo.png`,
            }

            // Prepare template parameters for confirmation email (to sender)
            const confirmationParams = {
                from_name: data.name,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                to_email: data.email,
                current_date: new Date().toLocaleString(),
                logo_url: `https://sean-website.vercel.app/images/sean logo.png`,
            }

            // Send notification email to you first
            const notificationResult = await emailjs.send(
                serviceId,
                templateId,
                notificationParams
            )

            if (notificationResult.status === 200) {
                // Send confirmation email to sender
                const confirmationResult = await emailjs.send(
                    serviceId,
                    confirmationTemplateId,
                    confirmationParams
                )

                if (confirmationResult.status === 200) {
                    // Dismiss loading toast and show success
                    toast.dismiss(loadingToast)
                    toast.success('Message sent successfully!', {
                        description: "Thank you for reaching out! I'll get back to you as soon as possible.",
                        duration: 5000,
                    })
                    // Reset form
                    form.reset()
                } else {
                    throw new Error(`Confirmation email failed with status: ${confirmationResult.status}`)
                }
            } else {
                throw new Error(`Notification email failed with status: ${notificationResult.status}`)
            }
        } catch (err) {
            console.error('EmailJS Error Details:', err)

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
                } else if (err.message.includes('configuration is missing')) {
                    errorMessage = err.message
                } else {
                    errorMessage = `Error: ${err.message}`
                }
            }

            // Dismiss loading toast and show error
            toast.dismiss(loadingToast)
            toast.error('Failed to send message', {
                description: errorMessage,
                duration: 5000,
            })
        }
    }

    return (
        <section id="contact" className="relative z-[2] pt-16 md:pt-24 lg:pt-32 pb-0">
            {/* Bottom blur transition for smooth footer connection */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/60 to-transparent backdrop-blur-sm pointer-events-none"></div>
            <div className="container-custom pb-16 md:pb-24 lg:pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-left mb-16"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-clash-display">
                        CONTACT.
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6" />
                    <p className="text-lg text-foreground-secondary max-w-2xl">
                        Have a project in mind or just want to chat? I'd love to hear from you.
                        Let's create something amazing together.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                            ease: [0.25, 0.4, 0.25, 1]
                        }}
                        viewport={{ once: true }}
                    >
                        <div className="glass-effect p-8 rounded-xl">
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.3,
                                    ease: [0.25, 0.4, 0.25, 1]
                                }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold mb-6 text-foreground"
                            >
                                Send me a message
                            </motion.h3>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <motion.div
                                        className="grid md:grid-cols-2 gap-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.4,
                                            ease: [0.25, 0.4, 0.25, 1]
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="transition-colors duration-200">Name *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Your name"
                                                            className="bg-surface border-surface-secondary focus:border-primary focus-visible:ring-primary transition-all duration-300 hover:border-primary/50"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{
                                                            opacity: form.formState.errors.name ? 1 : 0,
                                                            height: form.formState.errors.name ? 'auto' : 0
                                                        }}
                                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                                    >
                                                        <FormMessage />
                                                    </motion.div>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="transition-colors duration-200">Email *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="your.email@example.com"
                                                            className="bg-surface border-surface-secondary focus:border-primary focus-visible:ring-primary transition-all duration-300 hover:border-primary/50"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{
                                                            opacity: form.formState.errors.email ? 1 : 0,
                                                            height: form.formState.errors.email ? 'auto' : 0
                                                        }}
                                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                                    >
                                                        <FormMessage />
                                                    </motion.div>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                            ease: [0.25, 0.4, 0.25, 1]
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="transition-colors duration-200">Subject *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="What's this about?"
                                                            className="bg-surface border-surface-secondary focus:border-primary focus-visible:ring-primary transition-all duration-300 hover:border-primary/50"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{
                                                            opacity: form.formState.errors.subject ? 1 : 0,
                                                            height: form.formState.errors.subject ? 'auto' : 0
                                                        }}
                                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                                    >
                                                        <FormMessage />
                                                    </motion.div>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.6,
                                            ease: [0.25, 0.4, 0.25, 1]
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="transition-colors duration-200">Message *</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tell me about your project or idea..."
                                                            rows={5}
                                                            className="bg-surface border-surface-secondary focus:border-primary focus-visible:ring-primary resize-none transition-all duration-300 hover:border-primary/50"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{
                                                            opacity: form.formState.errors.message ? 1 : 0,
                                                            height: form.formState.errors.message ? 'auto' : 0
                                                        }}
                                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                                    >
                                                        <FormMessage />
                                                    </motion.div>
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.7,
                                            ease: [0.25, 0.4, 0.25, 1]
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.div
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                                            className="w-full"
                                        >
                                            <Button
                                                type="submit"
                                                disabled={form.formState.isSubmitting}
                                                className="w-full button-primary transition-all duration-300 group/modal-btn relative overflow-hidden"
                                                size="lg"
                                            >
                                                {form.formState.isSubmitting ? (
                                                    <>
                                                        <motion.div
                                                            className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                                                            animate={{ rotate: 360 }}
                                                            transition={{
                                                                duration: 1,
                                                                repeat: Infinity,
                                                                ease: "linear"
                                                            }}
                                                        />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="group-hover/modal-btn:translate-x-full group-hover/modal-btn:opacity-0 text-center transition-all duration-500">
                                                            Send Message
                                                        </span>
                                                        <div className="absolute inset-0 -translate-x-full group-hover/modal-btn:translate-x-0 flex items-center justify-center transition-all duration-500 z-20">
                                                            <Send className="w-4 h-4" />
                                                        </div>
                                                    </>
                                                )}
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                </form>
                            </Form>
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
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: [0.25, 0.4, 0.25, 1]
                                    }}
                                    className="flex items-center gap-4 p-4 glass-effect rounded-lg cursor-pointer 
                                               hover:bg-primary/5 transition-colors duration-300 
                                               border border-surface-secondary hover:border-primary/20"
                                >
                                    <motion.div
                                        className="p-3 bg-primary/10 rounded-lg"
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: [0, -5, 5, -5, 0],
                                            transition: { duration: 0.5 }
                                        }}
                                    >
                                        <info.icon className="w-5 h-5 text-primary" />
                                    </motion.div>
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
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.5 + index * 0.1,
                                            ease: [0.25, 0.4, 0.25, 1]
                                        }}
                                        className="p-3 bg-surface rounded-lg relative z-10 
                                                   hover:bg-transparent transition-all duration-300 
                                                   border border-transparent hover:border-primary/30"
                                        aria-label={link.name}
                                    >
                                        <motion.div
                                            whileHover={{
                                                scale: 1.15,
                                                rotate: 5,
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            <link.icon className="w-5 h-5 text-foreground-secondary 
                                                                  hover:text-primary transition-colors duration-300" />
                                        </motion.div>
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

