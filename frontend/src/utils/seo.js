const DEFAULT_TITLE = 'ASR Visuals | Video Editing, Thumbnails, and Social Media Growth';
const DEFAULT_DESCRIPTION = 'ASR Visuals helps creators grow with short form editing, thumbnail design, and social media management.';
const DEFAULT_KEYWORDS = [
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

const upsertMetaTag = (attrName, attrValue, content) => {
  if (!content) {
    return;
  }

  const selector = `meta[${attrName}="${attrValue}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertCanonical = (href) => {
  if (!href) {
    return;
  }

  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
};

const removeJsonLdById = (id) => {
  if (!id) {
    return;
  }

  const existingScript = document.head.querySelector(`script[data-seo-id="${id}"]`);
  if (existingScript) {
    existingScript.remove();
  }
};

const upsertJsonLd = (id, schema) => {
  if (!id || !schema) {
    return;
  }

  removeJsonLdById(id);
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo-id', id);
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

export const applySeo = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  twitterImage,
  ogType = 'website',
  noIndex = false,
  jsonLd,
  jsonLdId
}) => {
  const safeTitle = title || DEFAULT_TITLE;
  const safeDescription = description || DEFAULT_DESCRIPTION;
  const safeKeywords = keywords || DEFAULT_KEYWORDS;
  const origin = window.location.origin;
  const url = canonicalUrl || window.location.href;
  const imageUrl = ogImage || `${origin}/asr-logo.png`;
  const twitterImageUrl = twitterImage || imageUrl;

  document.title = safeTitle;

  upsertMetaTag('name', 'description', safeDescription);
  upsertMetaTag('name', 'keywords', safeKeywords);
  upsertMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  upsertMetaTag('name', 'author', 'ASR Visuals');
  upsertMetaTag('name', 'theme-color', '#ffffff');

  upsertMetaTag('property', 'og:type', ogType);
  upsertMetaTag('property', 'og:site_name', 'ASR Visuals');
  upsertMetaTag('property', 'og:locale', 'en_US');
  upsertMetaTag('property', 'og:title', safeTitle);
  upsertMetaTag('property', 'og:description', safeDescription);
  upsertMetaTag('property', 'og:url', url.split('#')[0]);
  upsertMetaTag('property', 'og:image', imageUrl);
  upsertMetaTag('property', 'og:image:alt', 'ASR Visuals preview image');

  upsertMetaTag('name', 'twitter:card', 'summary_large_image');
  upsertMetaTag('name', 'twitter:site', '@VisualsAsr83268');
  upsertMetaTag('name', 'twitter:title', safeTitle);
  upsertMetaTag('name', 'twitter:description', safeDescription);
  upsertMetaTag('name', 'twitter:image', twitterImageUrl);

  upsertCanonical(url);

  if (jsonLdId) {
    if (jsonLd) {
      upsertJsonLd(jsonLdId, jsonLd);
    } else {
      removeJsonLdById(jsonLdId);
    }
  }
};
