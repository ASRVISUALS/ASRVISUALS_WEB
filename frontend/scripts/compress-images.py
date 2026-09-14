#!/usr/bin/env python3
"""
Image Compression Script for Mobile Optimization
Reduces file sizes by 70-90% while maintaining acceptable quality
"""

import os
import sys
from PIL import Image

IMAGE_DIR = './src/assets/images'
QUALITY = 70  # JPEG quality balancing size and visual quality
MAX_WIDTH = 1920  # Maximum image width

def format_size(bytes):
    """Format bytes to human-readable size"""
    mb = bytes / (1024 * 1024)
    return f"{mb:.2f}MB"

def compress_images():
    """Compress all images in the assets directory"""
    stats = {'success': 0, 'skipped': 0, 'before': 0, 'after': 0}
    
    if not os.path.exists(IMAGE_DIR):
        print(f"✗ Directory not found: {IMAGE_DIR}")
        return
    
    print("🖼️  Compressing images for mobile optimization...\n")
    
    for dirpath, dirnames, filenames in os.walk(IMAGE_DIR):
        for filename in filenames:
            if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
                filepath = os.path.join(dirpath, filename)
                
                try:
                    # Get original size
                    original_size = os.path.getsize(filepath)
                    stats['before'] += original_size
                    
                    # Skip small files (already optimized)
                    if original_size < 300 * 1024:
                        print(f"✓ {filename} - already optimized ({format_size(original_size)})")
                        stats['after'] += original_size
                        stats['skipped'] += 1
                        continue
                    
                    # Open image
                    img = Image.open(filepath)
                    
                    # Convert RGBA/Palette modes to RGB
                    if img.mode in ('RGBA', 'LA', 'P'):
                        background = Image.new('RGB', img.size, (255, 255, 255))
                        if img.mode == 'P':
                            img = img.convert('RGBA')
                        if img.mode in ('RGBA', 'LA'):
                            background.paste(img, mask=img.split()[-1])
                        else:
                            background.paste(img)
                        img = background
                    
                    # Resize if too large
                    if img.width > MAX_WIDTH:
                        ratio = MAX_WIDTH / img.width
                        new_h = int(img.height * ratio)
                        img = img.resize((MAX_WIDTH, new_h), Image.Resampling.LANCZOS)
                    
                    # Determine output path (convert PNG to JPG)
                    if filename.lower().endswith('.png'):
                        output_path = filepath.replace('.png', '.jpg').replace('.PNG', '.jpg')
                    else:
                        output_path = filepath
                    
                    # Save compressed image
                    img.save(output_path, 'JPEG', quality=QUALITY, optimize=True)
                    
                    # Remove original PNG if converted
                    if output_path != filepath:
                        os.remove(filepath)
                    
                    # Calculate stats
                    new_size = os.path.getsize(output_path)
                    stats['after'] += new_size
                    reduction = ((original_size - new_size) / original_size * 100)
                    
                    print(f"✓ {os.path.basename(output_path)}: {format_size(original_size)} → {format_size(new_size)} ({reduction:.1f}% ↓)")
                    stats['success'] += 1
                    
                except Exception as e:
                    print(f"✗ {filename}: {str(e)}")
                    stats['after'] += original_size

    # Print summary
    print(f"\n{'='*70}")
    print(f"{'OPTIMIZATION COMPLETE':^70}")
    print(f"{'='*70}")
    print(f"✓ Successfully optimized: {stats['success']} images")
    print(f"⚠ Skipped (already optimized): {stats['skipped']} images")
    print(f"📦 Total size before: {format_size(stats['before'])}")
    print(f"📦 Total size after: {format_size(stats['after'])}")
    
    if stats['before'] > 0:
        total_reduction = ((stats['before'] - stats['after']) / stats['before'] * 100)
        print(f"⬇️  Total reduction: {total_reduction:.1f}%")
        print(f"💾 Saved: {format_size(stats['before'] - stats['after'])}")
    
    print(f"{'='*70}\n")

if __name__ == '__main__':
    compress_images()
