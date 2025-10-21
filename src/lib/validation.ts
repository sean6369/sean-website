import * as z from 'zod'

/**
 * Common validation schemas for forms
 */
export const emailSchema = z.string().email('Please enter a valid email address')

export const nameSchema = z.string().min(2, 'Name must be at least 2 characters')

export const messageSchema = z.string().min(10, 'Message must be at least 10 characters')

export const phoneSchema = z.string().optional().or(z.literal(''))

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: messageSchema
})

/**
 * Newsletter form validation schema
 */
export const newsletterSchema = z.object({
    email: emailSchema
})

/**
 * Generic form field validation
 */
export const validateField = (value: string, type: 'email' | 'name' | 'message' | 'phone') => {
    switch (type) {
        case 'email':
            return emailSchema.safeParse(value)
        case 'name':
            return nameSchema.safeParse(value)
        case 'message':
            return messageSchema.safeParse(value)
        case 'phone':
            return phoneSchema.safeParse(value)
        default:
            return { success: true }
    }
}

/**
 * Form error messages
 */
export const formErrors = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minLength: (min: number) => `Must be at least ${min} characters`,
    maxLength: (max: number) => `Must be no more than ${max} characters`
}
