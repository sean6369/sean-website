# Sean's Personal Website

A modern, responsive personal website built with Next.js 14, React 18, TypeScript, and Tailwind CSS, featuring the Anupuccin theme and beautiful animations.

## ✨ Features

- **Modern Tech Stack**: Next.js 14 with App Router, React 18, TypeScript
- **Beautiful Design**: Anupuccin theme with purple/pink accents and warm grays
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Framer Motion for delightful micro-interactions
- **Typography**: New York font for headings and body text, Menlo for code
- **Dark Mode**: Built-in dark mode toggle with system preference detection
- **SEO Optimized**: Complete metadata and Open Graph tags
- **Performance**: Static generation and image optimization
- **Accessibility**: ARIA labels and keyboard navigation support

## 🎨 Design System

### Colors (Anupuccin Theme)
- **Background**: Deep dark blues (#1e1e2e, #181825, #11111b)
- **Text**: Light grays (#cdd6f4, #bac2de, #a6adc8)
- **Primary**: Mauve purple (#cba6f7)
- **Secondary**: Pink (#f5c2e7)
- **Accent**: Sky blue (#89dceb)

### Typography
- **Headings**: New York (serif) with fallbacks
- **Body**: New York (serif) with fallbacks
- **Code**: Menlo (monospace) with fallbacks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sean
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout with fonts and metadata
│   └── page.tsx         # Home page component
├── components/
│   ├── ui/              # Reusable UI components
│   │   └── navigation.tsx
│   └── sections/        # Page sections
│       ├── hero.tsx
│       ├── about.tsx
│       ├── skills.tsx
│       ├── projects.tsx
│       ├── contact.tsx
│       └── footer.tsx
├── lib/
│   ├── fonts.ts         # Font configuration
│   └── utils.ts         # Utility functions
└── styles/
    └── globals.css      # Global styles and Tailwind imports
```

## 🛠️ Customization

### Personal Information
Update the following files with your information:

1. **Contact Details**: Edit social links and contact info in:
   - `src/components/sections/hero.tsx`
   - `src/components/sections/contact.tsx`
   - `src/components/sections/footer.tsx`

2. **Projects**: Add your projects in `src/components/sections/projects.tsx`

3. **Skills**: Update your skills in `src/components/sections/skills.tsx`

4. **About**: Personalize your story in `src/components/sections/about.tsx`

### Styling
- **Colors**: Modify the color palette in `tailwind.config.ts`
- **Fonts**: Update font families in `src/lib/fonts.ts`
- **Animations**: Customize Framer Motion animations in component files

### SEO
Update metadata in `src/app/layout.tsx`:
- Title and description
- Open Graph images
- Social media links

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Deploy to Other Platforms
The built application in the `.next` folder can be deployed to any platform that supports Node.js applications.

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered pages for better performance

## 🌟 Key Features Explained

### Navigation
- Smooth scrolling between sections
- Active section highlighting
- Mobile-responsive hamburger menu
- Dark mode toggle

### Hero Section
- Animated typing effect
- Particle background animation
- Call-to-action buttons
- Social media links

### Projects
- Filterable project grid
- Project detail modals
- Live demo and GitHub links
- Technology tags

### Contact Form
- Form validation
- Loading states
- Success feedback
- Email integration ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Anupuccin](https://github.com/AnubisNekhet/anupuccin) for the color palette inspiration

---

Built with ❤️ using Next.js and Tailwind CSS

