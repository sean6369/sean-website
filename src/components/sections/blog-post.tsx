'use client'

import { BlogPostWithContent, formatDate } from '@/lib/notion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'

interface BlogPostProps {
    post: BlogPostWithContent
}

export function BlogPost({ post }: BlogPostProps) {
    return (
        <article className="w-full text-black dark:text-white">
            {/* Post header */}
            <header className="mb-4 -mt-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 text-gray-700 dark:text-gray-300 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                    {post.title}
                </h1>
                
                {post.readTime && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">{post.readTime} min read</span>
                    </div>
                )}
                
                {post.excerpt && (
                    <p className="text-xl text-muted-foreground mb-0 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
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

            <Separator className="mb-4" />

            {/* Post content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => (
                            <h2 className="text-3xl font-bold font-serif mt-8 mb-4 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">{children}</h2>
                        ),
                        h2: ({ children }) => (
                            <h3 className="text-2xl font-bold font-serif mt-6 mb-3 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">{children}</h3>
                        ),
                        h3: ({ children }) => (
                            <h4 className="text-xl font-bold font-serif mt-5 mb-2 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">{children}</h4>
                        ),
                        p: ({ children }) => (
                            <p className="mb-4 leading-relaxed text-foreground/90 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">{children}</p>
                        ),
                        ul: ({ children }) => (
                            <ul className="list-disc list-inside mb-4 space-y-2 transition-[margin,padding] duration-300 ease-in-out">{children}</ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="list-decimal list-inside mb-4 space-y-2 transition-[margin,padding] duration-300 ease-in-out">{children}</ol>
                        ),
                        li: ({ children }) => (
                            <li className="text-foreground/90 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">{children}</li>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                                {children}
                            </blockquote>
                        ),
                        code: ({ children, className }) => {
                            const isInline = !className
                            return isInline ? (
                                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono transition-[font-size,margin,padding] duration-300 ease-in-out">
                                    {children}
                                </code>
                            ) : (
                                <code className={className}>{children}</code>
                            )
                        },
                        pre: ({ children }) => (
                            <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 transition-[margin,padding] duration-300 ease-in-out">
                                {children}
                            </pre>
                        ),
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                className="text-primary hover:underline transition-colors"
                                target={href?.startsWith('http') ? '_blank' : undefined}
                                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                                {children}
                            </a>
                        ),
                        img: ({ src, alt }) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={src}
                                alt={alt || ''}
                                className="rounded-lg my-6 w-full transition-[width,height] duration-300 ease-in-out"
                            />
                        ),
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

            <Separator className="my-12" />

            {/* Back to blog link and date */}
            <div className="flex items-center justify-between">
                <Link 
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200" />
                    <span>Back to all posts</span>
                </Link>
                <time className="text-sm text-gray-500 dark:text-gray-400 transition-[font-size,line-height,margin,padding] duration-300 ease-in-out">
                    {formatDate(post.date)}
                </time>
            </div>
        </article>
    )
}

