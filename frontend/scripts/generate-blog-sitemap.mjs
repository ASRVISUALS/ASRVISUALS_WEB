import fs from 'fs/promises';
import path from 'path';

const SITE_URL = (process.env.SITEMAP_SITE_URL || 'https://asrvisuals.live').replace(/\/+$/, '');
const FRONTEND_ROOT = process.cwd();
const PUBLIC_DIR = path.join(FRONTEND_ROOT, 'public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'blog-sitemap.xml');
const INDEX_OUTPUT_FILE = path.join(PUBLIC_DIR, 'sitemap-index.xml');
const FALLBACK_BLOG_SOURCE = path.join(FRONTEND_ROOT, 'src', 'data', 'fallbackBlogs.js');

const xmlEscape = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const normalizeDate = (value) => {
  if (!value) {
    return new Date().toISOString().slice(0, 10);
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }

  return date.toISOString().slice(0, 10);
};

const extractFallbackBlogs = async () => {
  try {
    const content = await fs.readFile(FALLBACK_BLOG_SOURCE, 'utf8');
    const seedEntryRegex = /\[\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*\]/g;

    const blogs = [];
    let match;
    while ((match = seedEntryRegex.exec(content)) !== null) {
      const slug = match[1];
      const title = match[2];
      const category = match[3];

      blogs.push({
        _id: `local-${slug}`,
        title,
        category,
        createdAt: new Date().toISOString()
      });
    }

    return blogs;
  } catch {
    return [];
  }
};

const fetchLiveBlogs = async () => {
  const defaultApiBase = `${SITE_URL}/api`;
  const apiBase = (process.env.SITEMAP_API_URL || process.env.REACT_APP_API_URL || defaultApiBase).replace(/\/+$/, '');
  const endpoint = `${apiBase.endsWith('/api') ? apiBase : `${apiBase}/api`}/blogs`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    const blogs = payload?.data?.blogs;
    return Array.isArray(blogs) ? blogs : [];
  } catch {
    return [];
  }
};

const buildSitemapXml = (blogs) => {
  const rows = blogs
    .filter((blog) => blog && blog._id)
    .map((blog) => {
      const loc = `${SITE_URL}/blog/${encodeURIComponent(String(blog._id))}`;
      const lastmod = normalizeDate(blog.updatedAt || blog.createdAt);
      return [
        '  <url>',
        `    <loc>${xmlEscape(loc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        '    <priority>0.7</priority>',
        '  </url>'
      ].join('\n');
    });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...rows,
    '</urlset>',
    ''
  ].join('\n');
};

const buildSitemapIndexXml = () => {
  const today = new Date().toISOString().slice(0, 10);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <sitemap>',
    `    <loc>${xmlEscape(`${SITE_URL}/sitemap.xml`)}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '  </sitemap>',
    '  <sitemap>',
    `    <loc>${xmlEscape(`${SITE_URL}/blog-sitemap.xml`)}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '  </sitemap>',
    '</sitemapindex>',
    ''
  ].join('\n');
};

const dedupeBlogs = (blogs) => {
  const byId = new Map();

  for (const blog of blogs) {
    if (!blog || !blog._id) {
      continue;
    }

    const key = String(blog._id);
    if (!byId.has(key)) {
      byId.set(key, blog);
    }
  }

  return Array.from(byId.values());
};

const main = async () => {
  const [liveBlogs, fallbackBlogs] = await Promise.all([fetchLiveBlogs(), extractFallbackBlogs()]);
  const blogs = dedupeBlogs([...liveBlogs, ...fallbackBlogs]);
  const xml = buildSitemapXml(blogs);
  const indexXml = buildSitemapIndexXml();

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.writeFile(OUTPUT_FILE, xml, 'utf8');
  await fs.writeFile(INDEX_OUTPUT_FILE, indexXml, 'utf8');

  console.log(`[seo] blog sitemap generated: ${blogs.length} urls -> ${OUTPUT_FILE}`);
  console.log(`[seo] sitemap index generated -> ${INDEX_OUTPUT_FILE}`);
};

main().catch((error) => {
  console.error('[seo] failed to generate blog sitemap:', error);
  process.exit(1);
});
