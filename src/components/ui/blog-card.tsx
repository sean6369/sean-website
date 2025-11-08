import Link from 'next/link'
import { BlogPost, formatDate } from '@/lib/notion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

interface BlogCardProps {
    post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="flex flex-col h-full">
                    <div className="mb-4">
                        <time className="text-sm text-muted-foreground">
                            {formatDate(post.date)}
                        </time>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-black dark:text-white">
                        {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                    </p>
                    
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                    
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                        Read more
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Card>
        </Link>
    )
}

