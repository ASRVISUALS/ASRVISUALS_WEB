import { promises as fs } from 'node:fs';
import path from 'node:path';

async function optimizeCssLoading() {
  const indexPath = path.resolve(process.cwd(), 'build/index.html');

  let html;
  try {
    html = await fs.readFile(indexPath, 'utf8');
  } catch (error) {
    console.warn(`[perf] Skipping CSS optimization: cannot read ${indexPath}`);
    return;
  }

  const stylesheetTagRegex = /<link\s+[^>]*rel=["']stylesheet["'][^>]*>/gi;
  let replacements = 0;

  const optimizedHtml = html.replace(stylesheetTagRegex, (tag) => {
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) {
      return tag;
    }

    const href = hrefMatch[1];

    // Only rewrite the CRA-emitted local stylesheet, not external font stylesheets.
    if (!href.startsWith('/static/css/')) {
      return tag;
    }

    replacements += 1;
    return [
      `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">`,
      `<noscript><link rel="stylesheet" href="${href}"></noscript>`
    ].join('');
  });

  if (replacements === 0) {
    console.log('[perf] No local stylesheet links found to optimize.');
    return;
  }

  await fs.writeFile(indexPath, optimizedHtml, 'utf8');
  console.log(`[perf] Optimized ${replacements} stylesheet link(s) for non-blocking load.`);
}

optimizeCssLoading().catch((error) => {
  console.error('[perf] CSS optimization failed:', error);
  process.exitCode = 1;
});
