import { Navigation } from '@/components/ui/navigation'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Milestones } from '@/components/sections/milestones'
import { Projects } from '@/components/sections/projects'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navigation />
            <Hero />
            {/* Spacer to maintain scroll position after fixed hero */}
            <div className="min-h-screen" />
            <About />
            <Milestones />
            <Projects />
            <Contact />
            <Footer />
        </main>
    )
}

