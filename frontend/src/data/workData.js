/**
 * Work Videos Database
 * Organized by category: SaaS Explainers, Talking Heads, Others
 */

export const workVideos = [
  // ===== SAAS EXPLAINERS =====
  {
    id: 'saas-v1',
    title: 'SaaS Explainer v1',
    category: 'SaaS Explainers',
    mediaType: 'Video',
    type: 'Long-form Story',
    description: 'Product-focused video engineered for clarity and conversion.',
    url: 'https://youtu.be/R8vW5a-6TTA'
  },
  {
    id: 'saas-v2',
    title: 'SaaS Explainer v2',
    category: 'SaaS Explainers',
    mediaType: 'Video',
    type: 'Long-form Story',
    description: 'Thought-leadership cut optimized for engagement and retention.',
    url: 'https://youtu.be/CzvX9cdCW5E'
  },
  {
    id: 'saas-v3',
    title: 'SaaS Explainer v3',
    category: 'SaaS Explainers',
    mediaType: 'Shorts',
    type: 'Short-Form',
    description: 'Viral-optimized short-form explainer for social distribution.',
    url: 'https://youtube.com/shorts/_VkmQVdkyjs?feature=share'
  },

  // ===== TALKING HEADS =====
  {
    id: 'talking-v1',
    title: 'Talking Head v1',
    category: 'Talking Heads',
    mediaType: 'Shorts',
    type: 'Short-Form',
    description: 'Direct-to-camera performance optimized for authenticity.',
    url: 'https://youtube.com/shorts/OctCccn7XuY?si=AxjqHs1JK60jgUzC'
  },
  {
    id: 'talking-v2',
    title: 'Talking Head v2',
    category: 'Talking Heads',
    mediaType: 'Shorts',
    type: 'Short-Form',
    description: 'High-energy delivery built for saves and shares.',
    url: 'https://youtube.com/shorts/W9Cbb6zErsA?si=LQpTxrSo-P2D6w7i'
  },
  {
    id: 'talking-v3',
    title: 'Talking Head v3',
    category: 'Talking Heads',
    mediaType: 'Shorts',
    type: 'Short-Form',
    description: 'Problem-focused narrative with clear CTA.',
    url: 'https://youtube.com/shorts/HV3gmADlZ9c?si=TNZamBSBRaRCb-uX'
  },
  {
    id: 'talking-v4',
    title: 'Talking Head v4',
    category: 'Talking Heads',
    mediaType: 'Shorts',
    type: 'Short-Form',
    description: 'Emotional angle designed for connection and trust.',
    url: 'https://youtube.com/shorts/Q9keCbxEJaw?si=wcs4Q8NuirdKGMfz'
  },
  {
    id: 'talking-v5',
    title: 'Talking Head v5',
    category: 'Talking Heads',
    mediaType: 'Shorts',
    type: 'Short-Form',
    description: 'Value-driven short optimized for watch-through.',
    url: 'https://youtube.com/shorts/oZF0D-_GpfI?si=GaXnpWfJdj341izY'
  },
  {
    id: 'talking-v6',
    title: 'Talking Head v6',
    category: 'Talking Heads',
    mediaType: 'Shorts',
    type: 'Short-Form',
    description: 'Expert perspective delivered with confidence.',
    url: 'https://youtube.com/shorts/SJCk4dnHwuQ?si=8W0zMee52FRZMSRU'
  },
  {
    id: 'talking-v7',
    title: 'Talking Head v7',
    category: 'Talking Heads',
    mediaType: 'Shorts',
    type: 'Short-Form',
    description: 'Action-focused messaging for immediate impact.',
    url: 'https://youtube.com/shorts/RYuF-pxKbjo?si=NffL2Q-3nnQWcvN-'
  },
  {
    id: 'talking-v8',
    title: 'Talking Head v8',
    category: 'Talking Heads',
    mediaType: 'Shorts',
    type: 'Short-Form',
    description: 'Conversion-optimized delivery with strategic pacing.',
    url: 'https://youtube.com/shorts/BzXrNjaqay4?si=X3d-Ex0avoHCiJmg'
  },

  // ===== OTHERS =====
  {
    id: 'others-v2',
    title: 'Others v2',
    category: 'Others',
    mediaType: 'Video',
    type: 'Long-form Story',
    description: 'Cinematic narrative crafted for emotional engagement.',
    url: 'https://youtu.be/xrYzCAVuGV0'
  }
];

const ALLOWED_WORK_CATEGORIES = new Set(['SaaS Explainers', 'Talking Heads', 'Others']);

export const normalizeWorkCategory = (category) => {
  return ALLOWED_WORK_CATEGORIES.has(category) ? category : 'Others';
};

export const normalizeMediaType = (item) => {
  if (item.mediaType) return item.mediaType;
  return item.url.includes('/shorts/') ? 'Shorts' : 'Video';
};

export const getUniqueWorkItems = (items) => {
  const seen = new Set();

  return items.reduce((acc, item) => {
    const mediaType = normalizeMediaType(item);
    const dedupeKey = item.id;

    if (seen.has(dedupeKey)) {
      return acc;
    }

    seen.add(dedupeKey);
    acc.push({
      ...item,
      mediaType,
      category: normalizeWorkCategory(item.category)
    });
    return acc;
  }, []);
};

export const getWorkItemsByCategory = (category) => {
  const cleanItems = getUniqueWorkItems(workVideos);
  return cleanItems.filter((item) => item.category === category);
};
