// Sitemap routes for SEO - Generate dynamic XML sitemaps
const express = require('express');
const Blog = require('../models/Blog');

const router = express.Router();

/**
 * GET /api/sitemap/blog.xml
 * Generates dynamic blog sitemap for all published blog posts
 * Used for Google Search Console and search engine crawling
 */
router.get('/blog.xml', async (req, res) => {
  try {
    // Fetch all published blogs
    const blogs = await Blog.find(
      { published: true },
      { slug: 1, updatedAt: 1, createdAt: 1 }
    )
    .sort({ publishedAt: -1 })
    .lean();

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
    xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">\n';

    // Add each blog post
    blogs.forEach((blog) => {
      const url = `https://asrvisuals.live/blog/${blog.slug}`;
      const lastmod = new Date(blog.updatedAt || blog.createdAt)
        .toISOString()
        .split('T')[0];

      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    // Set response headers for XML
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=43200'); // Cache for 12 hours
    res.send(xml);
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
});

/**
 * GET /api/sitemap/main.xml
 * Alternative endpoint for main sitemap (static pages)
 * Can be called to verify sitemap generation is working
 */
router.get('/main.xml', (req, res) => {
  try {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://asrvisuals.live/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://asrvisuals.live/services</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://asrvisuals.live/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://asrvisuals.live/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://asrvisuals.live/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://asrvisuals.live/thumbnails</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://asrvisuals.live/terms-and-conditions</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://asrvisuals.live/privacy-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://asrvisuals.live/refund-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://asrvisuals.live/tip-us</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(xml);
  } catch (error) {
    console.error('Error generating main sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
});

module.exports = router;
