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

// Convert Notion blocks to markdown
async function blocksToMarkdown(blockId: string): Promise<string> {
    const blocks = await notionFetch(`/blocks/${blockId}/children`)
    let markdown = ''
    
    for (const block of blocks.results) {
        const type = block.type
        const content = block[type]
        
        switch (type) {
            case 'paragraph':
                markdown += getPlainText(content.rich_text) + '\n\n'
                break
            case 'heading_1':
                markdown += `# ${getPlainText(content.rich_text)}\n\n`
                break
            case 'heading_2':
                markdown += `## ${getPlainText(content.rich_text)}\n\n`
                break
            case 'heading_3':
                markdown += `### ${getPlainText(content.rich_text)}\n\n`
                break
            case 'bulleted_list_item':
                markdown += `- ${getPlainText(content.rich_text)}\n`
                break
            case 'numbered_list_item':
                markdown += `1. ${getPlainText(content.rich_text)}\n`
                break
            case 'quote':
                markdown += `> ${getPlainText(content.rich_text)}\n\n`
                break
            case 'code':
                const code = getPlainText(content.rich_text)
                const language = content.language || ''
                markdown += `\`\`\`${language}\n${code}\n\`\`\`\n\n`
                break
            case 'divider':
                markdown += '---\n\n'
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
                date: properties.Date?.date?.start || new Date().toISOString(),
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
            date: properties.Date?.date?.start || new Date().toISOString(),
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

