# Contributing to Sean's Personal Website

Thank you for your interest in contributing to this project! This document provides guidelines for contributing to the personal website codebase.

## 🚀 Quick Start

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/sean6369/personal-website.git
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open http://localhost:3000 in your browser**

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the ESLint configuration
- **Prettier**: Code formatting is handled automatically
- **Naming**: Use descriptive names for variables, functions, and components

### Component Structure

```tsx
// Component template
'use client' // Only if using hooks or client-side features

import { motion } from 'framer-motion'
import { Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  // Define props with TypeScript
}

export function Component({ prop }: ComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="class-names"
    >
      {/* Component content */}
    </motion.div>
  )
}
```

### Styling Guidelines

- **Tailwind CSS**: Use Tailwind classes for styling
- **Anupuccin Theme**: Stick to the defined color palette
- **Responsive**: Mobile-first responsive design
- **Animations**: Use Framer Motion for animations

### File Organization

```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── ui/             # Reusable UI components
│   └── sections/       # Page sections
├── lib/                # Utility functions and configurations
└── styles/             # Global styles
```

## 🎨 Design System

### Colors (Anupuccin Theme)

```css
/* Primary colors */
--primary: #cba6f7;     /* Mauve */
--secondary: #f5c2e7;   /* Pink */
--accent: #89dceb;      /* Sky */

/* Background colors */
--background: #1e1e2e;  /* Base */
--surface: #313244;     /* Surface2 */

/* Text colors */
--foreground: #cdd6f4;  /* Text */
--muted: #6c7086;       /* Overlay2 */
```

### Typography

- **Headings**: New York (serif)
- **Body**: New York (serif)
- **Code**: Menlo (monospace)

### Components

- Use consistent spacing (multiples of 4px)
- Implement hover states for interactive elements
- Add loading states for async operations
- Include proper ARIA labels for accessibility

## 🔧 Common Tasks

### Adding a New Section

1. Create a new component in `src/components/sections/`
2. Import and add to `src/app/page.tsx`
3. Add navigation link in `src/components/ui/navigation.tsx`

### Updating Projects

1. Edit the `projects` array in `src/components/sections/projects.tsx`
2. Add project images to `public/projects/`
3. Update project metadata and links

### Modifying Styles

1. Update colors in `tailwind.config.ts`
2. Modify global styles in `src/styles/globals.css`
3. Use Tailwind utilities in components

### Adding New Pages

1. Create new route in `src/app/`
2. Add metadata for SEO
3. Update navigation if needed

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm start
```

## 📋 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding guidelines
   - Add appropriate comments
   - Test your changes

3. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide a clear description
   - Include screenshots for UI changes
   - Reference any related issues

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to reproduce**: How to reproduce the bug
- **Expected behavior**: What should happen
- **Screenshots**: If applicable
- **Environment**: Browser, OS, device

## 💡 Feature Requests

For feature requests:

- **Description**: Clear description of the feature
- **Use case**: Why this feature would be useful
- **Implementation**: Any ideas on implementation
- **Alternatives**: Other solutions considered

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📞 Contact

If you have questions or need help:

- Open an issue on GitHub
- Reach out via email: seanleesukiat@gmail.com

Thank you for contributing! 🎉

