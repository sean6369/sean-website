import { getBlogPosts } from '@/lib/notion'
import { BlogSidebar } from '@/components/sections/blog-sidebar'
import { BlogThemeToggle } from '@/components/ui/blog-theme-toggle'
import { Metadata } from 'next'
import Link from 'next/link'
import { Clock } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Blog | Sean',
    description: 'Thoughts, reflections, and insights on technology, creativity, and personal growth.',
    openGraph: {
        title: 'Blog | Sean',
        description: 'Thoughts, reflections, and insights on technology, creativity, and personal growth.',
        type: 'website',
    },
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export default async function BlogPage() {
    const posts = await getBlogPosts()

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-blog-dark font-sans">
            {/* Header with Title and Theme Toggle */}
            <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-6 max-w-7xl">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 font-serif">
                            Blog
                        </h1>
                        <BlogThemeToggle />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-2 lg:py-6 max-w-7xl transition-[padding,margin] duration-300 ease-in-out">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 transition-[gap] duration-300 ease-in-out">
                    {/* Sidebar */}
                    <BlogSidebar />

                    {/* Main Content */}
                    <div className="flex-1 max-w-3xl transition-[max-width,padding,margin] duration-300 ease-in-out">
                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-gray-500 dark:text-gray-400 mb-2 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                                Recent posts
                            </h2>
                            <div className="border-b border-gray-300 dark:border-gray-700 mb-3"></div>

                            {posts.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-xl text-gray-600 dark:text-gray-400 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                                        No blog posts yet. Check back soon!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-12">
                                    {posts.map((post) => (
                                        <article key={post.id} className="group">
                                            <Link href={`/blog/${post.slug}`}>
                                                <h2 className="text-2xl font-bold text-primary hover:text-primary/80 transition-[colors,font-size,line-height,margin,padding] duration-300 ease-in-out mb-0.5 group-hover:underline">
                                                    {post.title}
                                                </h2>
                                            </Link>
                                            
                                            {post.readTime && (
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span className="font-bold transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">{post.readTime} minute read</span>
                                                </div>
                                            )}

                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                                                {post.excerpt}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

