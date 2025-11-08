# Blog Setup Guide

## Overview

Your personal website now has a fully integrated blog powered by Notion CMS. This allows you to:
- Draft posts in Tana using voice notes (your preferred method)
- Polish and publish via Notion's clean interface
- Display posts beautifully on your site with consistent design
- Maintain full control over SEO and branding

## Step 1: Set Up Notion Database

### Create the Database

1. Go to [Notion](https://notion.so) and create a new database
2. Name it "Blog Posts"
3. Add the following properties:

| Property Name | Property Type | Description |
|--------------|---------------|-------------|
| Title | Title | Post title (default property) |
| Slug | Text | URL-friendly identifier (e.g., "power-of-recording-thoughts") |
| Published | Checkbox | Controls visibility on your site |
| Date | Date | Publish date |
| Excerpt | Text | Short preview/description (1-2 sentences) |
| Tags | Multi-select | Optional tags for categorization |

4. The page content itself will be the blog post body

### Get Your Notion API Key

1. Go to https://www.notion.so/my-integrations
2. Click "+ New integration"
3. Name it "Sean Blog" (or whatever you prefer)
4. Select your workspace
5. Click "Submit"
6. Copy the "Internal Integration Token" - this is your API key

### Connect Database to Integration

1. Open your "Blog Posts" database in Notion
2. Click the "..." menu (top right)
3. Scroll to "Connections"
4. Click "Connect to" and select your integration
5. Copy the database ID from the URL:
   - URL format: `https://www.notion.so/myworkspace/a8aec43384f447ed84390e8e42c2e089?v=...`
   - Database ID: `a8aec43384f447ed84390e8e42c2e089`

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Notion API Configuration
NOTION_API_KEY=your_notion_api_key_here
NOTION_DATABASE_ID=your_database_id_here
```

**Important:** Never commit this file to Git! (It's already in .gitignore)

## Step 3: Create Your First Blog Post

### Your Workflow (Tana → Notion)

1. **Draft in Tana:**
   - Use voice notes to capture thoughts
   - Organize and edit using Tana's features
   - Polish the content

2. **Publish via Notion:**
   - Open your "Blog Posts" database in Notion
   - Click "+ New" to create a new entry
   - Fill in the properties:
     - **Title:** Your post title
     - **Slug:** URL-friendly version (lowercase, hyphens, no spaces)
       - Example: "The Power of Recording Thoughts" → "power-of-recording-thoughts"
     - **Excerpt:** 1-2 sentence preview
     - **Date:** Publishing date
     - **Tags:** Optional categories
     - **Published:** Check this when ready to publish!
   - Open the page and paste/write your content
   - Use Notion's formatting (headings, lists, quotes, etc.)

3. **View on Your Site:**
   - Visit `yourwebsite.com/blog`
   - Your post will appear automatically (within ~60 seconds due to ISR)

## Step 4: Run Your Site

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000/blog` to see your blog!

## Features

### Automatic Features

✅ **Static Generation** - Fast loading, SEO-friendly
✅ **Incremental Static Regeneration (ISR)** - Auto-updates every 60 seconds
✅ **SEO Optimization** - Dynamic metadata for each post
✅ **Responsive Design** - Looks great on all devices
✅ **Dark Mode Support** - Matches your site's theme
✅ **Tag Support** - Organize posts by topics
✅ **Beautiful Typography** - Optimized reading experience

### Navigation

- Blog link automatically added to your navigation
- Works seamlessly with your existing stepper navigation
- Mobile-friendly menu integration

## Content Guidelines

### Slug Format
- Lowercase letters and numbers only
- Use hyphens for spaces
- Keep it short and descriptive
- Must be unique for each post

Examples:
- ✅ "power-of-recording-thoughts"
- ✅ "my-first-post"
- ✅ "2024-reflections"
- ❌ "My Post!" (uppercase, special chars)
- ❌ "my post" (spaces)

### Excerpt Tips
- 1-2 sentences max
- Compelling preview to encourage clicks
- 120-160 characters ideal for SEO
- Don't end with ellipsis (...)

### Content Formatting in Notion

Notion formatting will be converted to your site:
- **Headings:** Use H1, H2, H3 for structure
- **Bold/Italic:** For emphasis
- **Lists:** Bullet points or numbered
- **Quotes:** Block quotes for callouts
- **Code:** Inline code or code blocks
- **Links:** External links open in new tabs
- **Images:** Automatically styled with rounded corners

## Troubleshooting

### Post Not Showing Up?

1. Check that "Published" is checked in Notion
2. Wait 60 seconds for ISR to refresh
3. Check that `.env.local` has correct credentials
4. Verify database is connected to your Notion integration

### Styling Looks Wrong?

- Clear browser cache
- Rebuild the site: `npm run build`
- Check that globals.css has prose styles

### API Errors?

- Verify `NOTION_API_KEY` in `.env.local`
- Verify `NOTION_DATABASE_ID` in `.env.local`
- Check that integration has access to the database
- Look at terminal for specific error messages

## Example Blog Post in Notion

Here's how your first post from Tana would look in Notion:

**Title:** The power of recording thoughts
**Slug:** power-of-recording-thoughts
**Published:** ✓ (checked)
**Date:** November 7, 2025
**Excerpt:** Reflecting on how recording random thoughts captures authentic self-expression.
**Tags:** Reflection, Productivity

**Content:**
```
## Capturing the Essence of Our Thoughts

Recently, I've been pondering the significance of our thoughts. It's fascinating how they come to us at random times throughout the day...

[Rest of your content]
```

## Need Help?

Check the following files for customization:
- `/src/lib/notion.ts` - API integration
- `/src/components/sections/blog-post.tsx` - Post display
- `/src/components/ui/blog-card.tsx` - Post cards
- `/src/styles/globals.css` - Prose styling

---

Happy blogging! 🎉


