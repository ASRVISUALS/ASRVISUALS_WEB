import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogDetailPage.css';
import api from '../utils/api';
import { fallbackBlogs } from '../data/fallbackBlogs';
import { withMinBlogContent } from '../utils/blogContent';
import { applySeo } from '../utils/seo';

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const parseContentBlocks = (content = '') => {
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const usedIds = new Set();

  const getUniqueId = (base) => {
    let id = base || 'section';
    let counter = 2;
    while (usedIds.has(id)) {
      id = `${base}-${counter}`;
      counter += 1;
    }
    usedIds.add(id);
    return id;
  };

  return lines.map((line, index) => {
    const markdownMatch = line.match(/^(#{2,4})\s+(.+)$/);
    if (markdownMatch) {
      const headingText = markdownMatch[2].trim();
      const headingLevel = Math.min(markdownMatch[1].length, 3);
      const id = getUniqueId(slugify(headingText));
      return { type: 'heading', level: headingLevel, text: headingText, id, key: `h-${index}` };
    }

    const numberedMatch = line.match(/^\d+[).:-]\s+(.+)$/);
    if (numberedMatch) {
      const headingText = line.trim();
      const id = getUniqueId(slugify(headingText));
      return { type: 'heading', level: 2, text: headingText, id, key: `h-${index}` };
    }

    const likelyHeading =
      line.length <= 72 &&
      !/[.!?]$/.test(line) &&
      !line.includes(':') &&
      !line.includes(',');

    if (likelyHeading) {
      const headingText = line.trim();
      const id = getUniqueId(slugify(headingText));
      return { type: 'heading', level: 2, text: headingText, id, key: `h-${index}` };
    }

    return { type: 'paragraph', text: line, key: `p-${index}` };
  });
};

const buildFaqSchema = (blog, headings) => {
  const headline = blog?.title || 'Video editing guide';
  const primaryHeading = headings[0]?.text || 'How to apply this workflow';

  const faqs = [
    {
      question: `What is the fastest way to use: ${headline}?`,
      answer:
        'Start with the top framework in the article, apply it to one video immediately, and review retention and click-through data before the next upload.'
    },
    {
      question: `Which section should I focus on first in this guide?`,
      answer: `Start with "${primaryHeading}" first, then implement each step in order so the workflow remains consistent and measurable.`
    },
    {
      question: 'How often should I repeat this editing process?',
      answer:
        'Use the same process for every upload for at least 2 to 4 weeks, then optimize based on watch-time, retention curves, and audience feedback.'
    }
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
};

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRelatedBlogs = React.useCallback(async (category) => {
    try {
      const response = await api.get('/blogs');

      const related = response.data?.data?.blogs
        ?.filter((b) => b.category === category && b._id !== id)
        ?.slice(0, 3) || [];

      setRelatedBlogs(related.map((item) => withMinBlogContent(item, 300)));
    } catch (err) {
      const fallbackRelated = fallbackBlogs
        .filter((item) => item.category === category && item._id !== id)
        .slice(0, 3);
      setRelatedBlogs(fallbackRelated.map((item) => withMinBlogContent(item, 300)));
      console.error('Related blogs fetch error:', err);
    }
  }, [id]);

  const fetchBlog = React.useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`/blogs/${id}`);
      setBlog(withMinBlogContent(response.data?.data?.blog, 300));

      if (response.data?.data?.blog?.category) {
        fetchRelatedBlogs(response.data.data.blog.category);
      }
      setError(null);
    } catch (err) {
      const rawMessage = err?.response?.data?.message || '';
      const isServiceUnavailable = err?.response?.status === 503 || /service temporarily unavailable|database is not connected/i.test(rawMessage);
      const fallbackBlog = fallbackBlogs.find((item) => item._id === id);

      if (fallbackBlog) {
        setBlog(withMinBlogContent(fallbackBlog, 300));
        setRelatedBlogs(
          fallbackBlogs
            .filter((item) => item.category === fallbackBlog.category && item._id !== fallbackBlog._id)
            .slice(0, 3)
            .map((item) => withMinBlogContent(item, 300))
        );
        setError(null);
        return;
      }

      const message = err?.response?.status === 404
        ? 'Blog post not found'
        : (isServiceUnavailable ? 'Blog is temporarily unavailable right now.' : (rawMessage || 'Failed to load blog post'));
      setError(message);
      console.error('Blog fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [id, fetchRelatedBlogs]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  useEffect(() => {
    if (!blog) {
      return;
    }

    const baseUrl = window.location.origin;
    const canonicalUrl = `${baseUrl}/blog/${id}`;
    const cleanDescription = (blog.excerpt || blog.content || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);
    const headings = parseContentBlocks(blog.content || '').filter((block) => block.type === 'heading');
    const faqSchema = buildFaqSchema(blog, headings);
    const blogPostingSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: cleanDescription,
      image: blog.image ? [blog.image] : [`${baseUrl}/asr-logo.png`],
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
      articleBody: blog.content || blog.excerpt || '',
      keywords: blog.category || 'creator, content',
      author: {
        '@type': 'Organization',
        name: 'ASR Visuals',
        url: baseUrl
      },
      publisher: {
        '@type': 'Organization',
        name: 'ASR Visuals',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/asr-logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      }
    };

    applySeo({
      title: `${blog.title} | ASR Visuals Blog`,
      description: cleanDescription || 'Read this ASR Visuals article for practical creator growth insights.',
      canonicalUrl,
      ogImage: blog.image || `${baseUrl}/asr-logo.png`,
      twitterImage: blog.image || `${baseUrl}/asr-logo.png`,
      ogType: 'article',
      jsonLdId: 'route-page-schema',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [blogPostingSchema, faqSchema]
      }
    });
  }, [blog, id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <main className="blog-detail-page">
        <div className="loading">Loading blog post...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="blog-detail-page">
        <div className="error-message">{error}</div>
        <Link to="/blog" className="back-link">← Back to Blog</Link>
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="blog-detail-page">
        <div className="not-found">Blog post not found</div>
        <Link to="/blog" className="back-link">← Back to Blog</Link>
      </main>
    );
  }

  const contentBlocks = parseContentBlocks(blog.content || '');
  const tocItems = contentBlocks.filter((block) => block.type === 'heading');

  return (
    <main className="blog-detail-page">
      <div className="blog-detail-layout">
        <aside className="blog-toc">
          <div className="blog-toc-card">
            <h3>Table of Contents</h3>
            {tocItems.length > 0 ? (
              <ul>
                {tocItems.map((item) => (
                  <li key={item.id} className={`toc-level-${item.level}`}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No headings found for this article yet.</p>
            )}
          </div>
        </aside>

        <article className="blog-detail">
          <Link to="/blog" className="back-link">← Back to Blog</Link>

          {blog.image && (
            <div className="blog-detail-image">
              <img src={blog.image} alt={blog.title} loading="eager" decoding="async" fetchPriority="high" />
            </div>
          )}

          <div className="blog-detail-content">
            <div className="blog-detail-meta">
              <span className="blog-detail-date">{formatDate(blog.createdAt)}</span>
              {blog.category && (
                <span className="blog-detail-category">{blog.category}</span>
              )}
            </div>

            <h1 className="blog-detail-title">{blog.title}</h1>

            <div className="blog-detail-body">
              {contentBlocks.map((block) => {
                if (block.type === 'heading') {
                  if (block.level === 3) {
                    return <h3 key={block.key} id={block.id}>{block.text}</h3>;
                  }
                  return <h2 key={block.key} id={block.id}>{block.text}</h2>;
                }

                return <p key={block.key}>{block.text}</p>;
              })}
            </div>

            <div className="blog-detail-footer">
              <div className="share-links">
                <h4>Share this article:</h4>
                <div className="social-links">
                  <a href={`https://twitter.com/intent/tweet?text=${blog.title}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="social-btn twitter">Twitter</a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="social-btn linkedin">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {relatedBlogs.length > 0 && (
        <section className="related-blogs">
          <h2>Related Articles</h2>
          <div className="related-blogs-grid">
            {relatedBlogs.map(relatedBlog => (
              <Link key={relatedBlog._id} to={`/blog/${relatedBlog._id}`} className="related-blog-card">
                {relatedBlog.image && (
                  <div className="related-blog-image">
                    <img src={relatedBlog.image} alt={relatedBlog.title} loading="lazy" decoding="async" />
                  </div>
                )}
                <h3>{relatedBlog.title}</h3>
                <p className="related-blog-excerpt">{relatedBlog.excerpt || relatedBlog.content?.substring(0, 100)}...</p>
                <span className="read-more">Read Article →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="blog-cta">
        <h2>Read More Articles</h2>
        <p>Discover tips and strategies for growing your channel</p>
      </section>
    </main>
  );
}
