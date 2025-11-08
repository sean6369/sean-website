import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/notion'
import { BlogPost } from '@/components/sections/blog-post'
import { BlogSidebar } from '@/components/sections/blog-sidebar'
import { BlogThemeToggle } from '@/components/ui/blog-theme-toggle'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'

// Generate static params for all blog posts
export async function generateStaticParams() {
    const slugs = await getAllBlogSlugs()
    return slugs.map((slug) => ({
        slug,
    }))
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: { slug: string }
}): Promise<Metadata> {
    const post = await getBlogPostBySlug(params.slug)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: `${post.title} | Sean's Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        },
    }
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export default async function BlogPostPage({
    params,
}: {
    params: { slug: string }
}) {
    const post = await getBlogPostBySlug(params.slug)

    if (!post) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-gray-100 dark:bg-blog-dark font-sans">
            {/* Header with Title and Theme Toggle */}
            <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-6 max-w-7xl">
                    <div className="flex items-center justify-between">
                        <Link href="/blog">
                            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300 font-serif hover:text-primary transition-colors cursor-pointer">
                                Blog
                            </h1>
                        </Link>
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
                        <BlogPost post={post} />
                    </div>
                </div>
            </div>
        </main>
    )
}

