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
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Header with Title and Theme Toggle */}
            <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-6 max-w-7xl">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                            Blog
                        </h1>
                        <BlogThemeToggle />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <BlogSidebar />

                    {/* Main Content */}
                    <div className="flex-1 max-w-3xl">
                        <div className="mb-12">
                            <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4">
                                Recent posts
                            </h2>
                            <div className="border-b border-gray-300 dark:border-gray-700 mb-10"></div>

                            {posts.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-xl text-gray-600 dark:text-gray-400">
                                        No blog posts yet. Check back soon!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-12">
                                    {posts.map((post) => (
                                        <article key={post.id} className="group">
                                            <Link href={`/blog/${post.slug}`}>
                                                <h2 className="text-2xl font-semibold text-primary hover:text-primary/80 transition-colors mb-3 group-hover:underline">
                                                    {post.title}
                                                </h2>
                                            </Link>
                                            
                                            {post.readTime && (
                                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{post.readTime} minute read</span>
                                                </div>
                                            )}

                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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

