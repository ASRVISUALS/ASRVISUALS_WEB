import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applySeo } from '../../utils/seo';

const BASE_KEYWORDS = [
  'asrvisuals',
  'asrvisual',
  'arsvisuals',
  'ASR',
  'Asrvisuals',
  'video editing',
  'video editiing',
  'video editing agency',
  'saas video agency',
  'saas video ageny',
  'talking head video agency',
  'visuals',
  'editing studio'
].join(', ');

const getRouteSeo = (pathname) => {
  if (pathname.startsWith('/blog/')) {
    return {
      title: 'ASR Visuals Blog | Creator Growth Articles',
      description:
        'In-depth ASR Visuals blog articles on creator growth, editing systems, thumbnails, and social media performance.',
      keywords: `${BASE_KEYWORDS}, creator growth blog, video editing tips, thumbnail strategy`
    };
  }

  switch (pathname) {
    case '/':
      return {
        title: 'ASR Visuals | Video Editing, Thumbnails, and Social Media Growth',
        description:
          'ASR Visuals helps creators scale with long-form editing, shorts, high CTR thumbnails, and growth-focused content systems.',
        keywords: `${BASE_KEYWORDS}, short form editing, long form editing, thumbnail design agency`
      };
    case '/about':
      return {
        title: 'About ASR Visuals | Creator-Focused Editing Team',
        description:
          'Learn how ASR Visuals helps creators and brands with strategy-led editing, creative systems, and fast execution.',
        keywords: `${BASE_KEYWORDS}, about asr visuals, creative editing team`
      };
    case '/services':
      return {
        title: 'Services | ASR Visuals Editing, Shorts, Thumbnails',
        description:
          'Explore ASR Visuals services including reaction edits, podcast editing, shorts/reels workflows, thumbnail design, and channel management.',
        keywords: `${BASE_KEYWORDS}, podcast editing, shorts editing, reels editing, content post-production`
      };
    case '/blog':
      return {
        title: 'Blog | ASR Visuals Creator Growth Insights',
        description:
          'Read practical content strategy, editing, and growth articles for YouTube creators, shorts workflows, and thumbnail optimization.',
        keywords: `${BASE_KEYWORDS}, creator strategy blog, video editing insights`
      };
    case '/contact':
      return {
        title: 'Contact ASR Visuals | Project Inquiry Form',
        description:
          'Submit your project details to ASR Visuals and get a tailored response with recommendations, pricing, and next steps.',
        keywords: `${BASE_KEYWORDS}, contact video editing agency, hire editing studio`
      };
    case '/thumbnails':
      return {
        title: 'Thumbnail Case Studies | ASR Visuals',
        description:
          'See before-and-after thumbnail case studies and high-CTR examples from ASR Visuals optimized for mobile visibility and click intent.',
        keywords: `${BASE_KEYWORDS}, thumbnail design, youtube thumbnail studio, ctr thumbnails`
      };
    case '/admin':
      return {
        title: 'Admin | ASR Visuals',
        description: 'Internal admin dashboard for ASR Visuals content operations.'
      };
    case '/terms-and-conditions':
      return {
        title: 'Terms and Conditions | ASR Visuals',
        description: 'Read the ASR Visuals terms and conditions for services, payments, and delivery policies.',
        keywords: `${BASE_KEYWORDS}, asr visuals terms`
      };
    case '/privacy-policy':
      return {
        title: 'Privacy Policy | ASR Visuals',
        description: 'Review how ASR Visuals collects, uses, and protects your information.',
        keywords: `${BASE_KEYWORDS}, asr visuals privacy`
      };
    case '/refund-policy':
      return {
        title: 'Refund Policy | ASR Visuals',
        description: 'Read the ASR Visuals refund policy and service eligibility terms.',
        keywords: `${BASE_KEYWORDS}, asr visuals refund`
      };
    case '/tip-us':
      return {
        title: 'Tip Us | Support ASR Visuals',
        description: 'Support ASR Visuals with a tip and help us continue delivering high-quality creative work.',
        keywords: `${BASE_KEYWORDS}, support asr visuals`
      };
    default:
      return {
        title: 'ASR Visuals | Creator Growth Through Content Systems',
        description:
          'ASR Visuals helps creators and brands scale with performance editing, thumbnails, and social media execution.',
        keywords: BASE_KEYWORDS
      };
  }
};

export default function RouteSeo() {
  const location = useLocation();

  useEffect(() => {
    const seo = getRouteSeo(location.pathname);
    const canonicalUrl = `${window.location.origin}${location.pathname}`;
    const isHome = location.pathname === '/';

    applySeo({
      ...seo,
      canonicalUrl,
      noIndex: location.pathname.startsWith('/admin'),
      jsonLdId: 'route-page-schema',
      jsonLd: isHome
        ? {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': `${window.location.origin}/#organization`,
                name: 'ASR Visuals',
                alternateName: ['ASR', 'Asrvisuals', 'asrvisual', 'arsvisuals'],
                url: window.location.origin,
                logo: `${window.location.origin}/asr-logo.png`,
                knowsAbout: [
                  'Video Editing Agency',
                  'SaaS Video Agency',
                  'Talking Head Video Agency',
                  'Editing Studio',
                  'Visual Storytelling'
                ]
              },
              {
                '@type': 'WebSite',
                '@id': `${window.location.origin}/#website`,
                name: 'ASR Visuals',
                url: window.location.origin,
                publisher: {
                  '@id': `${window.location.origin}/#organization`
                }
              },
              {
                '@type': 'WebPage',
                name: seo.title,
                description: seo.description,
                url: canonicalUrl,
                isPartOf: {
                  '@id': `${window.location.origin}/#website`
                }
              }
            ]
          }
        : {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: seo.title,
            description: seo.description,
            url: canonicalUrl,
            isPartOf: {
              '@type': 'WebSite',
              name: 'ASR Visuals',
              url: window.location.origin
            }
          }
    });
  }, [location.pathname, location.search]);

  return null;
}
