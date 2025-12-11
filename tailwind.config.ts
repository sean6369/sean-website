import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'blog-dark': '#1A1A1A',
				background: {
					DEFAULT: 'var(--background)',
					secondary: 'var(--background-secondary)',
					tertiary: 'var(--background-tertiary)'
				},
				foreground: {
					DEFAULT: 'var(--foreground)',
					secondary: 'var(--foreground-secondary)',
					tertiary: 'var(--foreground-tertiary)'
				},
				surface: {
					DEFAULT: 'var(--surface)',
					secondary: 'var(--surface-secondary)',
					tertiary: 'var(--surface-tertiary)'
				},
				overlay: {
					DEFAULT: 'var(--overlay)',
					secondary: 'var(--overlay-secondary)',
					tertiary: 'var(--overlay-tertiary)'
				},
				primary: {
					'50': '#f5f0ff',
					'100': '#ede4ff',
					'200': '#ddd0ff',
					'300': '#c4b1ff',
					'400': '#a688ff',
					'500': '#8b5cf6',
					'600': '#7c3aed',
					'700': '#6d28d9',
					'800': '#5b21b6',
					'900': '#4c1d95',
					DEFAULT: 'var(--primary)'
				},
				secondary: {
					'50': '#fdf2f8',
					'100': '#fce7f3',
					'200': '#fbcfe8',
					'300': '#f9a8d4',
					'400': '#f472b6',
					'500': '#ec4899',
					'600': '#db2777',
					'700': '#be185d',
					'800': '#9d174d',
					'900': '#831843',
					DEFAULT: 'var(--secondary)'
				},
				accent: {
					'50': '#f0f9ff',
					'100': '#e0f2fe',
					'200': '#bae6fd',
					'300': '#7dd3fc',
					'400': '#38bdf8',
					'500': '#0ea5e9',
					'600': '#0284c7',
					'700': '#0369a1',
					'800': '#075985',
					'900': '#0c4a6e',
					DEFAULT: 'var(--accent)'
				},
				success: '#a6e3a1',
				warning: '#f9e2af',
				error: '#f38ba8',
				info: '#89b4fa',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				'new-york': [
					'var(--font-new-york)',
					'serif'
				],
				'clash-display': [
					'Clash Display',
					'sans-serif'
				],
				menlo: [
					'var(--font-menlo)',
					'monospace'
				]
			},
			fontSize: {
				xs: [
					'0.75rem',
					{
						lineHeight: '1rem'
					}
				],
				sm: [
					'0.875rem',
					{
						lineHeight: '1.25rem'
					}
				],
				base: [
					'1rem',
					{
						lineHeight: '1.5rem'
					}
				],
				lg: [
					'1.125rem',
					{
						lineHeight: '1.75rem'
					}
				],
				xl: [
					'1.25rem',
					{
						lineHeight: '1.75rem'
					}
				],
				'2xl': [
					'1.5rem',
					{
						lineHeight: '2rem'
					}
				],
				'3xl': [
					'1.875rem',
					{
						lineHeight: '2.25rem'
					}
				],
				'4xl': [
					'2.25rem',
					{
						lineHeight: '2.5rem'
					}
				],
				'5xl': [
					'3rem',
					{
						lineHeight: '1'
					}
				],
				'6xl': [
					'3.75rem',
					{
						lineHeight: '1'
					}
				],
				'7xl': [
					'4.5rem',
					{
						lineHeight: '1'
					}
				],
				'8xl': [
					'6rem',
					{
						lineHeight: '1'
					}
				],
				'9xl': [
					'8rem',
					{
						lineHeight: '1'
					}
				]
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'slide-down': 'slideDown 0.5s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				glow: 'glow 2s ease-in-out infinite alternate',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			keyframes: {
				fadeIn: {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				slideUp: {
					'0%': {
						transform: 'translateY(100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				slideDown: {
					'0%': {
						transform: 'translateY(-100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				scaleIn: {
					'0%': {
						transform: 'scale(0.9)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				glow: {
					'0%': {
						boxShadow: '0 0 5px #cba6f7'
					},
					'100%': {
						boxShadow: '0 0 20px #cba6f7, 0 0 30px #cba6f7'
					}
				},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			backdropBlur: {
				xs: '2px'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}

export default config

