const blogSeeds = [
  ['post-production-systems', 'Post-Production Systems That Scale', 'post production'],
  ['youtube-retention-editing', 'YouTube Editing for Better Retention', 'youtube video editing'],
  ['wedding-film-pacing', 'Wedding Film Pacing That Feels Cinematic', 'wedding video editing'],
  ['vfx-review-workflow', 'VFX Review Workflow for Faster Delivery', 'vfx services'],
  ['editor-team-handoff', 'Editor Team Handoff Without Rework', 'workflow systems'],
  ['thumbnail-editing-alignment', 'Thumbnail and Editing Alignment Strategy', 'creator growth'],
  ['color-grading-consistency', 'Color Grading Consistency Across Cameras', 'color grading'],
  ['audio-post-basics', 'Audio Post Basics for Professional Videos', 'audio post production'],
  ['client-feedback-template', 'Client Feedback Template That Saves Time', 'workflow systems'],
  ['first-draft-speed', 'How to Deliver Faster First Drafts', 'video editing company'],
  ['shorts-hook-framework', 'Shorts Hook Framework for First-Second Retention', 'youtube video editing'],
  ['motion-graphics-minimal', 'When to Keep Motion Graphics Minimal', 'video editing company'],
  ['editing-style-guide', 'Editing Style Guide for Multi-Editor Teams', 'workflow systems'],
  ['creator-editor-partnership', 'Building a Long-Term Creator-Editor Partnership', 'creator growth'],
  ['revision-policy', 'Revision Policy Clients Respect', 'post production'],
  ['broll-story-structure', 'B-Roll for Better Story Structure', 'video editing company'],
  ['vfx-invisible-quality', 'Why Great VFX Is Often Invisible', 'vfx services'],
  ['youtube-series-structure', 'YouTube Series Structure for Binge Watching', 'youtube video editing'],
  ['wedding-highlight-framework', 'Wedding Highlight Film Framework', 'wedding video editing'],
  ['remote-editing-management', 'Managing Remote Editors Effectively', 'workflow systems'],
  ['delivery-qc-checklist', 'Final Delivery QC Checklist', 'workflow systems'],
  ['post-production-pricing', 'Pricing Post-Production Without Losing Margin', 'post production'],
  ['creative-brief-quality', 'Creative Briefs That Improve Edit Quality', 'post production'],
  ['channel-growth-editing', 'Editing Systems for Channel Growth', 'creator growth'],
  ['vfx-preproduction-planning', 'VFX Pre-Production Planning Guide', 'vfx services'],
  ['sound-design-retention', 'Sound Design That Improves Watch-Time', 'audio post production'],
  ['color-and-skin-tone', 'Protecting Skin Tone in Color Workflows', 'color grading'],
  ['portfolio-edit-presentation', 'Presenting Portfolio Edits to Win Clients', 'video editing company'],
  ['high-volume-content-ops', 'High-Volume Content Operations Playbook', 'post production'],
  ['ai-assisted-editing-workflow', 'AI-Assisted Editing Workflow for Teams', 'workflow systems']
];

const categoryLens = {
  'post production': 'post-production operations',
  'youtube video editing': 'YouTube retention editing',
  'wedding video editing': 'wedding storytelling edits',
  'vfx services': 'VFX planning and compositing',
  'workflow systems': 'editorial workflow design',
  'creator growth': 'creator growth systems',
  'color grading': 'color management and grading',
  'audio post production': 'audio and finishing'
};

const workflowAngles = [
  'pre-edit planning and shot mapping',
  'rough-cut pacing with intentional transitions',
  'revision rounds with tight feedback windows',
  'quality control before publishing or delivery',
  'handoff standards for multi-editor teams',
  'analytics reviews that inform the next upload'
];

const qualityChecks = [
  'voice clarity, music balance, and noise cleanup',
  'skin tone consistency across mixed camera footage',
  'on-screen text readability for mobile audiences',
  'cut rhythm aligned with narrative emotion',
  'title-open loop alignment for stronger retention',
  'export integrity checks for platform delivery specs'
];

const growthSignals = [
  'first 30-second retention curve',
  'average view duration trend',
  'click-through change after thumbnail updates',
  'comments per thousand views',
  'rewatch behavior on key segments',
  'time-to-publish between content releases'
];

const countWords = (text = '') =>
  text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const makeLongFormContent = (title, category, slug, index, minWords = 300) => {
  const lens = categoryLens[category] || category;
  const angleA = workflowAngles[index % workflowAngles.length];
  const angleB = workflowAngles[(index + 2) % workflowAngles.length];
  const angleC = workflowAngles[(index + 4) % workflowAngles.length];
  const checkA = qualityChecks[index % qualityChecks.length];
  const checkB = qualityChecks[(index + 3) % qualityChecks.length];
  const signalA = growthSignals[index % growthSignals.length];
  const signalB = growthSignals[(index + 2) % growthSignals.length];
  const signalC = growthSignals[(index + 4) % growthSignals.length];

  const sections = [
    {
      heading: '## Strategic Context',
      body:
        `${title} is most effective when it is treated as a repeatable system instead of a one-time creative sprint. ` +
        `Teams working on ${lens} usually get better outcomes when goals, references, and deadlines are locked before editing begins. ` +
        `This reduces subjective revisions, protects momentum, and gives both client and editor a shared definition of what "done" actually means.`
    },
    {
      heading: '## Production Blueprint',
      body:
        `A practical blueprint starts with ${angleA}, then moves to ${angleB}, and ends with ${angleC}. ` +
        `Each stage should include ownership, a timestamped checklist, and explicit approval criteria. ` +
        `When responsibilities are visible, creative energy goes into storytelling instead of repeated coordination fixes.`
    },
    {
      heading: '## Quality Controls That Prevent Rework',
      body:
        `Before delivery, run a focused quality pass covering ${checkA} and ${checkB}. ` +
        `These checks are small but high-impact because they catch the issues that audiences notice immediately. ` +
        `A final playback on desktop and mobile should be mandatory, especially for content expected to perform on multiple platforms.`
    },
    {
      heading: '## Communication and Revision Discipline',
      body:
        `Most delays are not caused by editing speed; they come from unclear feedback. ` +
        `For ${slug.replace(/-/g, ' ')}, collect revision notes in one structured document grouped by timeline markers. ` +
        `Ask decision-makers to prioritize must-fix, should-fix, and optional changes so the team can protect both creative quality and delivery dates.`
    },
    {
      heading: '## Performance Measurement',
      body:
        `After publishing, review ${signalA}, ${signalB}, and ${signalC} across at least three releases. ` +
        `Single-video conclusions are usually noisy; pattern-based analysis is more reliable. ` +
        `Use these metrics to tune pacing, opening structure, and narrative flow so each next project starts from validated insights.`
    },
    {
      heading: '## Implementation Plan for the Next 14 Days',
      body:
        `Week one: define your standard operating checklist and pilot it on one active project. ` +
        `Week two: compare revision count, turnaround time, and client satisfaction with your previous workflow baseline. ` +
        `If outcomes improve, document the process as a permanent playbook so your team can scale without sacrificing consistency.`
    }
  ];

  let content = sections.map((section) => `${section.heading}\n${section.body}`).join('\n\n');

  if (countWords(content) < minWords) {
    content +=
      '\n\n## Final Takeaway\n' +
      `${title} should be executed as a measurable system: clear planning, disciplined review cycles, strict technical quality checks, and analytics-led refinement. ` +
      `When this structure is followed consistently, ${category} projects become faster to deliver, easier to manage, and more likely to generate predictable growth.`;
  }

  return content;
};

export const fallbackBlogs = blogSeeds.map((seed, index) => {
  const [slug, title, category] = seed;
  const day = 30 - (index % 28);
  const dayText = String(day).padStart(2, '0');

  return {
    _id: `local-${slug}`,
    title,
    category,
    createdAt: `2026-02-${dayText}`,
    excerpt: `${title} with practical steps you can apply immediately to improve quality and consistency.`,
    content: makeLongFormContent(title, category, slug, index, 300)
  };
});
