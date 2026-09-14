/**
 * Image Optimization Utilities
 * Provides helpers for responsive images, lazy loading, and format conversion
 */

/**
 * Generates optimized image URL with Vercel Image Optimization
 * or other CDN parameters if available
 */
export const getOptimizedImageUrl = (src, width = null, quality = 80) => {
  if (!src) return '';
  
  // If using external CDN or Vercel, format accordingly
  // For now, return base URL - can be extended for Vercel/CloudFlare Image Optimization
  const url = new URL(src, window.location.origin);
  
  // You can add query parameters here for future CDN integration
  // url.searchParams.append('w', width);
  // url.searchParams.append('q', quality);
  
  return url.toString();
};

/**
 * Generates srcset for responsive images with multiple device pixel ratios
 * Supports: 1x, 2x @ various widths
 */
export const generateImageSrcSet = (basePath, widths = [320, 640, 1024, 1280]) => {
  // Remove file extension
  const pathWithoutExt = basePath.replace(/\.[^/.]+$/, '');
  
  const srcset = [];
  
  widths.forEach(width => {
    srcset.push(`${pathWithoutExt}-${width}w.jpg ${width}w`);
  });
  
  return srcset.join(', ');
};

/**
 * Generates WebP srcset with JPEG fallback
 */
export const generateWebPSrcSet = (basePath) => {
  const pathWithoutExt = basePath.replace(/\.[^/.]+$/, '');
  const jpegPath = `${pathWithoutExt}.jpg`;
  const webpPath = `${pathWithoutExt}.webp`;
  
  return {
    jpeg: `${jpegPath} 1x, ${jpegPath.replace('.jpg', '@2x.jpg')} 2x`,
    webp: `${webpPath} 1x, ${webpPath.replace('.webp', '@2x.webp')} 2x`
  };
};

/**
 * Gets optimized image attributes for lazy loading
 */
export const getImageOptimizationAttrs = (priority = 'low') => {
  return {
    loading: priority === 'high' ? 'eager' : 'lazy',
    decoding: 'async',
    ...(priority === 'high' && { fetchPriority: 'high' })
  };
};

/**
 * Calculates responsive image sizes based on viewport
 * Default: mobile-first responsive design
 */
export const getImageSizes = (type = 'full') => {
  const sizes = {
    full: '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 1280px',
    half: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 45vw, 640px',
    third: '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, (max-width: 1280px) 30vw, 426px',
    thumbnail: '(max-width: 640px) 100vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 300px',
    hero: '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw'
  };
  
  return sizes[type] || sizes.full;
};

/**
 * Mobile-optimized image loading strategy
 * Returns loading priority based on viewport and image position
 */
export const getMobileImagePriority = (imageIndex = 0, viewportWidth = 0) => {
  // Get viewport width if not provided
  const vw = viewportWidth || window.innerWidth;
  const isMobile = vw < 768;
  
  if (isMobile) {
    // On mobile, only prioritize first 2 images
    return imageIndex < 2 ? 'high' : 'low';
  }
  
  // On desktop, prioritize first 4 images
  return imageIndex < 4 ? 'high' : 'low';
};

/**
 * Preload critical images for faster LCP (Largest Contentful Paint)
 */
export const preloadCriticalImages = (imageUrls = []) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.imagesrcset = url; // For responsive images
    document.head.appendChild(link);
  });
};

/**
 * Intersection Observer wrapper for lazy-loaded images
 * Better performance than native lazy loading on mobile
 */
export const setupLazyImageObserver = (callback) => {
  const images = document.querySelectorAll('img[data-src]');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
    });
    return;
  }
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
        callback?.(img);
      }
    });
  }, {
    rootMargin: '50px'
  });
  
  images.forEach(img => imageObserver.observe(img));
};

export default {
  getOptimizedImageUrl,
  generateImageSrcSet,
  generateWebPSrcSet,
  getImageOptimizationAttrs,
  getImageSizes,
  getMobileImagePriority,
  preloadCriticalImages,
  setupLazyImageObserver
};
