import React from 'react';

/**
 * Responsive image component with srcset and picture element support
 * Automatically handles multiple screen sizes and formats (WebP fallback)
 * 
 * @param {string} src - Main image source
 * @param {string} alt - Image alt text
 * @param {string} className - CSS class name
 * @param {string} loading - Loading strategy ('lazy' or 'eager')
 * @param {string} sizes - Media query sizes for srcset
 * @param {boolean} useWebP - Enable WebP format with fallback (default: true)
 * @param {string} width - Image width
 * @param {string} height - Image height
 * @param {function} onLoad - Callback when image loads
 */
export default function ResponsiveImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  useWebP = true,
  width,
  height,
  onLoad,
  ...rest
}) {
  if (!src) {
    return null;
  }

  // Generate responsive image paths with device pixel ratios
  const generateSrcSet = (imagePath) => {
    // Remove file extension
    const pathWithoutExt = imagePath.replace(/\.[^/.]+$/, '');
    
    return [
      `${pathWithoutExt}.jpg 1x`,
      `${pathWithoutExt}@2x.jpg 2x`,
      `${pathWithoutExt}@3x.jpg 3x`
    ].join(', ');
  };

  const generateWebPSrcSet = (imagePath) => {
    const pathWithoutExt = imagePath.replace(/\.[^/.]+$/, '');
    
    return [
      `${pathWithoutExt}.webp 1x`,
      `${pathWithoutExt}@2x.webp 2x`,
      `${pathWithoutExt}@3x.webp 3x`
    ].join(', ');
  };

  // If WebP is not supported or disabled, use standard img tag
  if (!useWebP) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        sizes={sizes}
        srcSet={generateSrcSet(src)}
        width={width}
        height={height}
        onLoad={onLoad}
        {...rest}
      />
    );
  }

  // Use picture element for WebP support with JPEG fallback
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={generateWebPSrcSet(src)}
        sizes={sizes}
      />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        sizes={sizes}
        srcSet={generateSrcSet(src)}
        width={width}
        height={height}
        onLoad={onLoad}
        {...rest}
      />
    </picture>
  );
}
