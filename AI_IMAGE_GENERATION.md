# AI Blog Cover Image Generation

This document explains the AI-powered blog cover image generation system integrated into the CreatorFlow application.

## Overview

The application now supports automatic AI-generated cover images for blog posts using Google's Gemini API. This feature:

- **Generates images once** when blog posts are created/published
- **Caches the image URL** for reuse across all renders
- **Provides fallback** to default placeholder if generation fails
- **Allows manual override** by specifying custom image URLs
- **Integrates seamlessly** with the admin blog editor

## Architecture

### Components

1. **Backend Image Generator** (`backend/src/utils/imageGenerator.ts`)
   - Handles Gemini API calls
   - Manages prompts and image generation logic
   - Provides error handling and fallback behavior

2. **Blog Controller** (`backend/src/controllers/blogController.ts`)
   - New endpoint: `POST /blog/generate-image`
   - Protected by admin authentication
   - Validates required fields (title, slug, category)

3. **Blog Routes** (`backend/src/routes/blogRoutes.ts`)
   - Image generation route configured with admin auth
   - Integrates with existing blog CRUD routes

4. **Admin Blog Form** (`admin/src/pages/Blog.tsx`)
   - "Generate with AI" button for cover images
   - Shows image preview while editing
   - Manual URL input for custom images

5. **Blog Pages** (Frontend)
   - `frontend/src/app/(routes)/blog/page.tsx` - Landing page with image thumbnails
   - `frontend/src/app/(routes)/blog/[slug]/page.tsx` - Detail page with full-width header image

### Data Flow

```
1. Admin creates/edits blog post
   ↓
2. Clicks "Generate with AI" button
   ↓
3. Frontend calls POST /blog/generate-image
   ↓
4. Backend calls Gemini API with blog title + category
   ↓
5. Gemini generates image and returns URL
   ↓
6. Frontend receives URL and displays preview
   ↓
7. Admin saves post with coverImage URL
   ↓
8. Post stored in MongoDB with image reference
   ↓
9. Blog pages fetch and display coverImage alongside post content
```

## Configuration

### 1. Get Google Generative AI API Key

1. Go to https://ai.google.dev/
2. Click "Get API Key"
3. Create new project in Google Cloud Console
4. Generate an API key
5. Save to environment: `GOOGLE_AI_API_KEY=your-key`

### 2. Set Environment Variable

Add to `backend/.env`:
```
GOOGLE_AI_API_KEY=your-google-generative-ai-api-key
```

### 3. Verify Packages

The required package is already installed:
```bash
npm list generative-ai
```

Should show: `generative-ai@0.1.4` (or later)

## API Endpoints

### Generate Blog Cover Image

**Endpoint:** `POST /blog/generate-image`

**Authentication:** Required (admin only)

**Request Body:**
```json
{
  "title": "10 Editing Tricks That Double Your Retention",
  "slug": "editing-tricks-retention",
  "category": "Editing Tips"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "imageUrl": "https://example.com/generated-image.png",
    "generatedAt": "2024-02-21T10:30:00Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Missing required fields: title, slug, category"
}
```

## Implementation Details

### Image Generation Strategy

The current implementation uses a **generate-once, cache-forever** approach:

1. **On Post Creation:** Image is generated when admin submits form
2. **URL Storage:** Image URL stored in MongoDB `coverImage` field
3. **On Page Renders:** Same URL reused, no re-generation
4. **Cost Benefit:** Single API call per post, minimal cost

### Prompt Engineering

The generator creates intelligent prompts based on category:

```
Blog Title: "${params.title}"
Category: ${params.category}

Visual Hints by Category:
- content-creation: video camera, editing software, YouTube/TikTok icons
- social-media: engagement metrics, content calendar, growth graphs
- video-production: film reel, editing timeline, production equipment
- marketing: marketing funnel, conversion metrics, target audience
- seo: search icon, ranking graph, keyword research, analytics
- automation: workflow diagram, process flow, efficiency graphics
- tutorial: step-by-step visual, learning icon, progression arrows
- case-study: before-after comparison, success metrics, statistics
```

### Fallback Behavior

If image generation fails:
1. Error is logged to console
2. Fallback URL is returned: `https://images.unsplash.com/photo-...`
3. User can manually enter image URL
4. Post can still be saved and published

## Usage

### For Admin Users

1. Go to Admin > Blog Posts
2. Create new post or edit existing
3. Fill in: Title, Category, Excerpt, Content, etc.
4. For Cover Image:
   - Option A: Click "Generate with AI" to auto-generate
   - Option B: Paste custom image URL
5. Preview loads below the input
6. Click "Save" to publish

### For Blog Readers

- **Blog landing page:** Shows cover images as post thumbnails
- **Blog detail page:** Shows full-width cover image at top
- **On hover:** Images scale up with smooth animation
- **On error:** Images gracefully hide if URL is broken

## Future Enhancements

### Potential Improvements

1. **Per-Category Styling**
   - Different prompts for different content types
   - Brand-consistent color palettes

2. **Bulk Generation**
   - Generate images for multiple existing posts
   - CLI tool for batch operations

3. **Image Optimization**
   - Auto-compress generated images
   - WebP format conversion
   - CDN integration

4. **Alternative Providers**
   - Support for Replicate, OpenAI's DALL-E
   - Fallback to multiple providers

5. **Manual Fine-tuning**
   - Regenerate with different prompts
   - A/B test different versions

## Troubleshooting

### Issue: "GOOGLE_AI_API_KEY not set"
**Solution:** Add environment variable to `backend/.env`

### Issue: Images not loading on blog page
**Solution:** Check image URL in MongoDB covers object - verify URL is accessible

### Issue: Generation always returns fallback
**Solution:** Verify API key is valid, check Google AI Studio quota

### Issue: Admin form shows error saving
**Solution:** Ensure admin user has correct authorization role in database

## Database Schema

### BlogPost Model
```typescript
{
  title: String (required),
  slug: String (required, unique),
  excerpt: String (required),
  content: String (required),
  author: String (required),
  category: String (required),
  tags: [String],
  coverImage: String (optional),  // Image URL stored here
  seoDescription: String (optional),
  published: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## Monitoring

### Logs to Watch

Check backend logs for:
```
Image generation request for: [TITLE]
```

This indicates:
- Endpoint is being called
- Title is being passed correctly
- Generation is processing

### Metrics to Track

- Number of posts with coverImage set
- Average generation response time
- Fallback usage rate (% of failed generations)

## Security Considerations

1. **API Key Protection**
   - Never commit API keys to git
   - Use `.env` for local, GitHub Secrets for CI/CD
   - Rotate keys periodically

2. **Endpoint Protection**
   - Image generation endpoint requires admin auth
   - Only logged-in admins can trigger generation

3. **URL Validation**
   - Frontend validates image URLs load successfully
   - Failed images hide gracefully

## Cost Estimation

Google Generative AI pricing (as of 2024):
- **Free tier:** 60 requests/minute for development
- **Paid tier:** $1.50-2.00 per 1M character input

For blog image generation:
- ~500 characters per prompt
- Cost: ~$0.00075 per image
- 100 posts/month = ~$0.075/month

## Support

For issues or questions:
1. Check Google AI documentation: https://ai.google.dev/
2. Review imageGenerator.ts for implementation details
3. Check backend logs for API errors
4. Verify .env configuration is correct

## Version History

- **v1.0** (Feb 2024) - Initial implementation with Gemini API
  - Generate-once-cache approach
  - Admin form integration
  - Blog page image display
  - Fallback mechanism
