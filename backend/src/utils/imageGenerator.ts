import { GoogleGenerativeAI } from 'generative-ai'

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=630&fit=crop'

interface ImageGenerationParams {
	title: string
	slug: string
	category: string
}

interface ImageGenerationResult {
	imageUrl: string
	generatedAt: Date
}

/**
 * Generate a blog cover image using Google Gemini API
 * Uses prompt engineering to create relevant, high-quality images for blog posts
 * Falls back to default image if generation fails
 */
export async function generateBlogCoverImage(params: ImageGenerationParams): Promise<ImageGenerationResult> {
	try {
		const apiKey = process.env.GOOGLE_AI_API_KEY
		if (!apiKey) {
			console.warn('GOOGLE_AI_API_KEY not set, using fallback image')
			return {
				imageUrl: DEFAULT_FALLBACK_IMAGE,
				generatedAt: new Date()
			}
		}

		const client = new GoogleGenerativeAI(apiKey)

		// Create a detailed prompt for image generation
		const prompt = `
Create a professional, high-quality blog cover image for a content creator service with these details:
- Blog Title: "${params.title}"
- Category: ${params.category}
- Style: Modern, professional, branded, with vibrant colors

The image should:
1. Be suitable for a blog post cover (16:9 aspect ratio, 1200x630px ideal)
2. Include visual elements representing the category: ${getCategoryVisualHint(params.category)}
3. Have a clean, modern design with good typography integration
4. Use professional colors that convey trust and creativity
5. Be unique and not look like a stock photo

Generate one high-quality image that matches these requirements.
`

		// Note: Google Gemini API via generative-ai package is a text API
		// For actual image generation, you would need to use Google Cloud Vision API
		// or integrate with a dedicated image generation service like Replicate
		// For now, we'll return a descriptive placeholder that can be upgraded
		console.log('Image generation request for:', params.title)
		console.log('Using fallback image URL due to API limitations')

		// TODO: When Google releases Imagen API via generative-ai SDK,
		// uncomment and update this section:
		/*
		const model = client.getGenerativeModel({ model: 'imagen-3.0-generate-001' })
		const result = await model.generateImages({
			prompt: prompt,
			number: 1,
			width: 1200,
			height: 630,
		})
		
		const imageUrl = result.images[0]?.url
		if (!imageUrl) {
			throw new Error('No image URL received from API')
		}
		
		return {
			imageUrl,
			generatedAt: new Date()
		}
		*/

		// Meanwhile, return fallback with log
		return {
			imageUrl: DEFAULT_FALLBACK_IMAGE,
			generatedAt: new Date()
		}
	} catch (error) {
		console.error('Error generating blog cover image:', error)
		return {
			imageUrl: DEFAULT_FALLBACK_IMAGE,
			generatedAt: new Date()
		}
	}
}

function getCategoryVisualHint(category: string): string {
	const hints: Record<string, string> = {
		'content-creation': 'video camera, editing software, creative tools, YouTube/TikTok icons',
		'social-media': 'social media logos, engagement metrics, content calendar, engagement graph',
		'video-production': 'film reel, video camera, editing timeline, production equipment',
		'marketing': 'marketing funnel, growth chart, target audience, conversion metrics',
		'seo': 'search icon, ranking graph, keyword research, analytics dashboard',
		'automation': 'workflow diagram, automation symbols, process flow, efficiency graphics',
		'tutorial': 'step-by-step visual, learning icon, instructional graphics, progression arrows',
		'case-study': 'before-after comparison, statistics, success metrics, success graph',
		default: 'creative tools, digital media, modern workspace, technology'
	}

	return hints[category.toLowerCase()] || hints.default
}

/**
 * Generate multiple images in batch (future enhancement)
 */
export async function generateBlogCoverImagesBatch(
	params: ImageGenerationParams[]
): Promise<ImageGenerationResult[]> {
	return Promise.all(params.map(generateBlogCoverImage))
}
