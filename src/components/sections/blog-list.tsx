import { BlogPost } from '@/lib/notion'
import { BlogCard } from '@/components/ui/blog-card'

interface BlogListProps {
    posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    No blog posts yet. Check back soon!
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
        </div>
    )
}

