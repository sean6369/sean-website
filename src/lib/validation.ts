import * as z from 'zod'

/**
 * Field schemas backing the contact form.
 */
export const emailSchema = z.string().email('Please enter a valid email address')

export const nameSchema = z.string().min(2, 'Name must be at least 2 characters')

export const messageSchema = z.string().min(10, 'Message must be at least 10 characters')

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: messageSchema
})
