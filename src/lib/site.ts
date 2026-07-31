/**
 * Absolute base URL for the deployed site.
 *
 * Needed anywhere a URL is consumed outside the browsing context and so cannot
 * be relative: Open Graph / Twitter card images, and assets embedded in emails.
 *
 * Override per environment with NEXT_PUBLIC_SITE_URL (custom domain, preview
 * deploy, local tunnel). The fallback is the current production deployment.
 */
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sean-website.vercel.app'

/** Logo embedded in outgoing contact-form emails. Must be absolute. */
export const EMAIL_LOGO_URL = `${SITE_URL}/logos/sean_logo.png`
