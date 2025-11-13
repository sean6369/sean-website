import { cache } from 'react'

const NOTION_API_VERSION = '2022-06-28'

// Use direct API calls instead of SDK due to Next.js bundling issues
async function notionFetch(endpoint: string, options: RequestInit = {}) {
    const apiKey = process.env.NOTION_API_KEY
    
    if (!apiKey) {
        throw new Error('NOTION_API_KEY is required')
    }
    
    const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
        ...options,
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Notion-Version': NOTION_API_VERSION,
            'Content-Type': 'application/json',
            ...options.headers,
        },
    })
    
    if (!response.ok) {
        const error = await response.text()
        throw new Error(`Notion API error: ${response.status} ${error}`)
    }
    
    return response.json()
}

// Convert Notion rich text to plain text
function getPlainText(richText: any[]): string {
    if (!richText || richText.length === 0) return ''
    return richText.map((text: any) => text.plain_text).join('')
}

// Extract date from Notion properties, trying multiple property names and structures
function getDateFromProperties(properties: any, fallbackTime?: string): string {
    // Try common date property names
    const datePropertyNames = ['Date', 'date', 'Publish Date', 'Published Date', 'Post Date']
    
    for (const propName of datePropertyNames) {
        const prop = properties[propName]
        if (prop) {
            // Check if it's a date type property
            if (prop.type === 'date' && prop.date?.start) {
                return prop.date.start
            }
            // Also try direct access
            if (prop.date?.start) {
                return prop.date.start
            }
        }
    }
    
    // Try to find any property of type 'date'
    const dateProp = Object.values(properties).find((prop: any) => prop.type === 'date')
    if (dateProp && (dateProp as any).date?.start) {
        return (dateProp as any).date.start
    }
    
    // Fallback to created_time if provided, otherwise return empty string
    return fallbackTime || ''
}

// Normalize Notion ID by removing dashes for comparison
function normalizeNotionId(id: string): string {
    return id.replace(/-/g, '')
}

// Check if a page is a blog post by fetching its properties
async function isBlogPost(pageId: string): Promise<string | null> {
    try {
        const databaseId = process.env.NOTION_DATABASE_ID
        if (!databaseId) {
            return null
        }
        
        // Fetch the page
        const page: any = await notionFetch(`/pages/${pageId}`)
        
        if (!page) {
            return null
        }
        
        // Get properties first (we'll need them anyway)
        const properties = page.properties
        
        // Normalize IDs for comparison (Notion IDs can have dashes or not)
        const normalizedDatabaseId = normalizeNotionId(databaseId)
        const pageParentId = page.parent?.database_id ? normalizeNotionId(page.parent.database_id) : null
        
        // Check if this page is in the blog database
        const isInDatabase = page.parent?.type === 'database_id' && pageParentId === normalizedDatabaseId
        
        // Check if page has a Slug property (indicates it's likely a blog post)
        const hasSlug = properties.Slug && getPlainText(properties.Slug?.rich_text || [])
        
        if (isInDatabase && hasSlug) {
            // Definitely a blog post - return the slug
            return hasSlug
        }
        
        // Fallback: If page has a Slug property, verify it's in the database
        // This handles cases where parent relationship might not be set correctly
        if (hasSlug) {
            try {
                // Query the database to see if this page exists in it
                const queryResponse = await notionFetch(`/databases/${databaseId}/query`, {
                    method: 'POST',
                    body: JSON.stringify({
                        page_size: 100 // Check first 100 pages
                    })
                })
                
                const matchingPage = queryResponse.results.find((p: any) => 
                    normalizeNotionId(p.id) === normalizeNotionId(pageId)
                )
                
                if (matchingPage) {
                    // Found in database, return the slug
                    return hasSlug
                }
            } catch (fallbackError) {
                // If query fails, silently continue
            }
        }
        
        return null
    } catch (error) {
        // Silently return null on error
        return null
    }
}

// Convert Notion rich text to markdown, preserving formatting (links, bold, italic, mentions)
async function richTextToMarkdown(richText: any[]): Promise<string> {
    if (!richText || richText.length === 0) return ''
    
    const segments = await Promise.all(richText.map(async (segment: any) => {
        // Handle mentions (type: "mention")
        if (segment.type === 'mention') {
            const mention = segment.mention
            const textContent = segment.plain_text || ''
            let mentionUrl = null
            
            // Convert mentions to links based on mention type
            if (mention?.type === 'page') {
                // Check if the mentioned page is a blog post
                const pageId = mention.page?.id
                if (pageId) {
                    const slug = await isBlogPost(pageId)
                    if (slug) {
                        // It's a blog post, link to the blog post on the website
                        mentionUrl = `/blog/${slug}`
                    } else {
                        // Not a blog post, link to the Notion page
                        mentionUrl = mention.page?.url || `https://notion.so/${pageId.replace(/-/g, '')}`
                    }
                } else {
                    // Fallback to Notion URL if no page ID
                    mentionUrl = `https://notion.so/${mention.page?.id?.replace(/-/g, '') || ''}`
                }
            } else if (mention?.type === 'user') {
                // User mention - could link to user profile or just show as text
                // For now, just show as text since we don't have user profile URLs
                return textContent
            } else if (mention?.type === 'date') {
                // Date mention - show as formatted date
                const date = mention.date
                if (date?.start) {
                    const dateStr = date.end ? `${date.start} to ${date.end}` : date.start
                    return dateStr
                }
                return textContent
            } else if (mention?.type === 'database') {
                // Database mention - link to the database
                mentionUrl = mention.database?.url || `https://notion.so/${mention.database?.id?.replace(/-/g, '') || ''}`
            } else if (mention?.type === 'link_preview') {
                // Link preview mention - use the URL
                mentionUrl = mention.link_preview?.url || null
            }
            
            // If we have a URL, convert to markdown link
            if (mentionUrl) {
                return `[${textContent}](${mentionUrl})`
            }
            return textContent
        }
        
        // Handle regular text segments
        // Get the text content
        const textContent = segment.plain_text || segment.text?.content || ''
        
        // Check for formatting
        const annotations = segment.annotations || {}
        const isBold = annotations.bold || false
        const isItalic = annotations.italic || false
        
        // Check for hyperlink
        const url = segment.href || segment.text?.link?.url || null
        
        // Apply formatting (order matters: bold+italic = ***text***)
        let formattedText = textContent
        if (isBold && isItalic) {
            formattedText = `***${textContent}***`
        } else if (isBold) {
            formattedText = `**${textContent}**`
        } else if (isItalic) {
            formattedText = `*${textContent}*`
        }
        
        // Wrap in link if URL exists
        if (url) {
            return `[${formattedText}](${url})`
        }
        
        return formattedText
    }))
    
    return segments.join('')
}

// Extract YouTube video ID from URL and convert to embed URL
function getYouTubeEmbedUrl(url: string): string | null {
    if (!url) return null
    
    // Match various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/,
    ]
    
    for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`
        }
    }
    
    return null
}

// Check if URL is a YouTube URL
function isYouTubeUrl(url: string): boolean {
    return /youtube\.com|youtu\.be/.test(url)
}

// Convert Notion blocks to markdown
async function blocksToMarkdown(blockId: string): Promise<string> {
    const blocks = await notionFetch(`/blocks/${blockId}/children`)
    let markdown = ''
    
    for (const block of blocks.results) {
        const type = block.type
        const content = block[type]
        
        switch (type) {
            case 'paragraph':
                markdown += await richTextToMarkdown(content.rich_text) + '\n\n'
                break
            case 'heading_1':
                markdown += `# ${await richTextToMarkdown(content.rich_text)}\n\n`
                break
            case 'heading_2':
                markdown += `## ${await richTextToMarkdown(content.rich_text)}\n\n`
                break
            case 'heading_3':
                markdown += `### ${await richTextToMarkdown(content.rich_text)}\n\n`
                break
            case 'bulleted_list_item':
                markdown += `- ${await richTextToMarkdown(content.rich_text)}\n`
                break
            case 'numbered_list_item':
                markdown += `1. ${await richTextToMarkdown(content.rich_text)}\n`
                break
            case 'quote':
                markdown += `> ${await richTextToMarkdown(content.rich_text)}\n\n`
                break
            case 'code':
                const code = await richTextToMarkdown(content.rich_text)
                const language = content.language || ''
                markdown += `\`\`\`${language}\n${code}\n\`\`\`\n\n`
                break
            case 'divider':
                markdown += '---\n\n'
                break
            case 'embed':
            case 'video':
            case 'bookmark':
                const embedUrl = content.url || content.external?.url || content.file?.external?.url || ''
                
                if (embedUrl) {
                    // Check if it's a YouTube URL
                    if (isYouTubeUrl(embedUrl)) {
                        const embedSrc = getYouTubeEmbedUrl(embedUrl)
                        if (embedSrc) {
                            // Use HTML iframe for YouTube embeds (ReactMarkdown will need to support this)
                            markdown += `<div class="youtube-embed"><iframe src="${embedSrc}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n\n`
                        } else {
                            // Fallback to link if embed URL extraction fails
                            markdown += `[Watch Video](${embedUrl})\n\n`
                        }
                    } else {
                        // For non-YouTube embeds, use iframe
                        markdown += `<div class="embed-container"><iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe></div>\n\n`
                    }
                }
                break
            case 'image':
                const imageUrl = content.external?.url || content.file?.external?.url || content.file?.url || ''
                const imageCaption = content.caption?.length > 0 ? await richTextToMarkdown(content.caption) : ''
                if (imageUrl) {
                    markdown += `![${imageCaption}](${imageUrl})\n\n`
                }
                break
        }
    }
    
    return markdown
}

// Define blog post type
export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string
    date: string
    tags: string[]
    published: boolean
    readTime?: number
}

export interface BlogPostWithContent extends BlogPost {
    content: string
}

// Fetch all published blog posts
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
    try {
        const databaseId = process.env.NOTION_DATABASE_ID

        if (!databaseId) {
            console.error('NOTION_DATABASE_ID is not set')
            return []
        }

        const response = await notionFetch(`/databases/${databaseId}/query`, {
            method: 'POST',
            body: JSON.stringify({
                filter: {
                    property: 'Published',
                    checkbox: {
                        equals: true,
                    },
                },
                sorts: [
                    {
                        property: 'Date',
                        direction: 'descending',
                    },
                ],
            }),
        })

        const posts = response.results.map((page: any) => {
            const properties = page.properties

            // Find the title property (could be "Title", "Name", or the first title type property)
            let title = 'Untitled'
            
            // Try common title property names
            if (properties.Title?.title) {
                title = getPlainText(properties.Title.title)
            } else if (properties.Name?.title) {
                title = getPlainText(properties.Name.title)
            } else {
                // Find first property of type 'title'
                const titleProp = Object.values(properties).find((prop: any) => prop.type === 'title')
                if (titleProp) {
                    title = getPlainText((titleProp as any).title)
                }
            }

            return {
                id: page.id,
                title: title || 'Untitled',
                slug: getPlainText(properties.Slug?.rich_text || []) || '',
                excerpt: getPlainText(properties.Excerpt?.rich_text || []) || '',
                date: getDateFromProperties(properties, page.created_time) || new Date().toISOString(),
                tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
                published: properties.Published?.checkbox || false,
                readTime: properties['Read Time']?.number || properties.ReadTime?.number || undefined,
            }
        })
        
        return posts
    } catch (error) {
        console.error('Error fetching blog posts:', error)
        return []
    }
})

// Fetch a single blog post by slug
export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPostWithContent | null> => {
    try {
        const databaseId = process.env.NOTION_DATABASE_ID

        if (!databaseId) {
            console.error('NOTION_DATABASE_ID is not set')
            return null
        }

        const response = await notionFetch(`/databases/${databaseId}/query`, {
            method: 'POST',
            body: JSON.stringify({
                filter: {
                    and: [
                        {
                            property: 'Published',
                            checkbox: {
                                equals: true,
                            },
                        },
                        {
                            property: 'Slug',
                            rich_text: {
                                equals: slug,
                            },
                        },
                    ],
                },
            }),
        })

        if (response.results.length === 0) {
            return null
        }

        const page: any = response.results[0]
        const properties = page.properties

        // Find the title property (could be "Title", "Name", or the first title type property)
        let title = 'Untitled'
        
        // Try common title property names
        if (properties.Title?.title) {
            title = getPlainText(properties.Title.title)
        } else if (properties.Name?.title) {
            title = getPlainText(properties.Name.title)
        } else {
            // Find first property of type 'title'
            const titleProp = Object.values(properties).find((prop: any) => prop.type === 'title')
            if (titleProp) {
                title = getPlainText((titleProp as any).title)
            }
        }

        // Get page content
        const content = await blocksToMarkdown(page.id)

        return {
            id: page.id,
            title: title || 'Untitled',
            slug: getPlainText(properties.Slug?.rich_text || []) || '',
            excerpt: getPlainText(properties.Excerpt?.rich_text || []) || '',
            date: getDateFromProperties(properties, page.created_time) || new Date().toISOString(),
            tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
            published: properties.Published?.checkbox || false,
            readTime: properties['Read Time']?.number || properties.ReadTime?.number || undefined,
            content,
        }
    } catch (error) {
        console.error('Error fetching blog post:', error)
        return null
    }
})

// Get all slugs for static generation
export const getAllBlogSlugs = cache(async (): Promise<string[]> => {
    const posts = await getBlogPosts()
    return posts.map((post) => post.slug)
})

// Format date for display
export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

