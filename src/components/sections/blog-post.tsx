'use client'

import { BlogPostWithContent, formatDate } from '@/lib/notion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface BlogPostProps {
    post: BlogPostWithContent
}

export function BlogPost({ post }: BlogPostProps) {
    return (
        <article className="w-full text-black dark:text-white">
            {/* Back button */}
            <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-8 text-sm"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
            </Link>

            {/* Post header */}
            <header className="mb-8">
                <time className="text-sm text-gray-500 dark:text-gray-400 block mb-4">
                    {formatDate(post.date)}
                </time>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black dark:text-white">
                    {post.title}
                </h1>
                
                {post.excerpt && (
                    <p className="text-xl text-muted-foreground mb-6">
                        {post.excerpt}
                    </p>
                )}
                
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </header>

            <Separator className="mb-8" />

            {/* Post content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => (
                            <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
                        ),
                        h2: ({ children }) => (
                            <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
                        ),
                        h3: ({ children }) => (
                            <h4 className="text-xl font-bold mt-5 mb-2">{children}</h4>
                        ),
                        p: ({ children }) => (
                            <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
                        ),
                        li: ({ children }) => (
                            <li className="text-foreground/90">{children}</li>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                                {children}
                            </blockquote>
                        ),
                        code: ({ children, className }) => {
                            const isInline = !className
                            return isInline ? (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                                    {children}
                                </code>
                            ) : (
                                <code className={className}>{children}</code>
                            )
                        },
                        pre: ({ children }) => (
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                                {children}
                            </pre>
                        ),
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                className="text-primary hover:underline"
                                target={href?.startsWith('http') ? '_blank' : undefined}
                                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                                {children}
                            </a>
                        ),
                        img: ({ src, alt }) => (
                            <img
                                src={src}
                                alt={alt || ''}
                                className="rounded-lg my-6 w-full"
                            />
                        ),
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

            <Separator className="my-12" />

            {/* Back to blog link */}
            <div className="text-left">
                <Link 
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to all posts
                </Link>
            </div>
        </article>
    )
}

