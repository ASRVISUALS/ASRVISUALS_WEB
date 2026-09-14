const countWords = (text = '') =>
  text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const expansionOpeners = [
  'To apply this effectively in production, define a clear objective before touching the timeline.',
  'In most client workflows, consistency improves when the team documents decisions early.',
  'A reliable content pipeline starts by removing ambiguity from references, deadlines, and review criteria.',
  'Strong creative output is easier to sustain when each stage has a measurable success condition.',
  'The fastest teams are usually the ones that standardize process without flattening creativity.'
];

const expansionMethods = [
  'Use one review document with timestamped notes and priority labels to avoid contradictory revisions.',
  'Run a two-pass quality check: first for storytelling clarity, then for technical polish and platform readiness.',
  'Track turnaround time, revision count, and approval speed so process changes can be validated objectively.',
  'Establish reusable templates for project setup, exports, and delivery handoff to reduce avoidable mistakes.',
  'Close each project with a short retrospective and convert lessons into checklist updates for the next cycle.'
];

const expansionResults = [
  'This approach usually reduces rework while improving delivery confidence for both creators and clients.',
  'Over a few publishing cycles, these habits improve retention, quality consistency, and team alignment.',
  'Once repeated across multiple projects, the workflow becomes easier to scale without quality drift.',
  'As execution stabilizes, teams spend less time fixing avoidable errors and more time improving storytelling.',
  'The long-term benefit is predictable output quality even under tighter turnaround windows.'
];

export const ensureMinWords = (content = '', title = '', minWords = 300) => {
  if (countWords(content) >= minWords) {
    return content;
  }

  let nextContent = content.trim();
  const usedBlocks = new Set();

  if (!nextContent) {
    nextContent = `## ${title || 'Article Overview'}\n` +
      'This article outlines a practical execution model you can run immediately with your current team and tooling.';
  }

  let attempt = 0;
  while (countWords(nextContent) < minWords && attempt < 20) {
    const opener = expansionOpeners[attempt % expansionOpeners.length];
    const method = expansionMethods[(attempt + 1) % expansionMethods.length];
    const result = expansionResults[(attempt + 2) % expansionResults.length];

    const block = `${opener} ${method} ${result}`;
    if (!usedBlocks.has(block)) {
      usedBlocks.add(block);
      nextContent += `\n\n## Additional Insight ${attempt + 1}\n${block}`;
    }
    attempt += 1;
  }

  return nextContent;
};

export const withMinBlogContent = (blog, minWords = 300) => {
  if (!blog) {
    return blog;
  }

  return {
    ...blog,
    content: ensureMinWords(blog.content || '', blog.title || '', minWords),
  };
};
