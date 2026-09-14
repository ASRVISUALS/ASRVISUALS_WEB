/* eslint-disable no-console */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const connectDB = require('../src/config/database');
const Blog = require('../src/models/Blog');
const User = require('../src/models/User');

const blogSeeds = [
  {
    title: 'What Reliable Post-Production Actually Looks Like',
    excerpt:
      'Reliable post-production is less about one polished export and more about predictable systems from footage handoff to final delivery.',
    category: 'video editing company',
    createdAt: '2026-03-12',
    content:
      '## Why reliability matters\nA beautiful final video is important, but consistency in communication and delivery is what teams remember.\n\n## What a reliable workflow includes\nClear kickoff notes, timeline milestones, revision limits, and delivery checklists keep projects on track.\n\n## Common failure points\nMissed handoffs, unclear feedback, and undefined ownership are usually the real bottlenecks.\n\n## Action step\nStandardize your intake form and weekly progress updates before scaling volume.'
  },
  {
    title: 'What Production Teams Actually Need From a VFX Partner',
    excerpt:
      'Strong VFX partners reduce production risk with process clarity, not just cinematic shots in a showreel.',
    category: 'vfx services',
    createdAt: '2026-03-10',
    content:
      '## Beyond the showreel\nA great reel proves capability, but day-to-day project reliability determines success.\n\n## Process signals to look for\nLook for shot tracking, version naming discipline, and fixed review windows.\n\n## Collaboration standard\nThe best VFX partners explain tradeoffs early so producers can protect budget and deadlines.'
  },
  {
    title: 'Editor vs Video Editing Company: How to Choose',
    excerpt:
      'Both options can work, but they solve different scaling problems depending on output volume and review complexity.',
    category: 'video editing company',
    createdAt: '2026-03-08',
    content:
      '## Solo editor strengths\nA solo editor can be fast, flexible, and highly personal for low-volume work.\n\n## Company strengths\nAn editing company adds redundancy, process stability, and multi-project capacity.\n\n## Decision rule\nIf delivery speed and consistency across multiple videos matter, choose structured post-production support.'
  },
  {
    title: 'Why Great VFX Is Often Invisible',
    excerpt:
      'The best visual effects are often the ones viewers never notice because they serve story continuity perfectly.',
    category: 'vfx services',
    createdAt: '2026-03-06',
    content:
      '## The invisible standard\nAudiences should feel immersion, not distraction from the narrative.\n\n## Subtle VFX use-cases\nCleanup, sky replacement, set extension, and continuity corrections drive quality quietly.\n\n## Review criteria\nJudge VFX by storytelling flow, not only by spectacle.'
  },
  {
    title: 'Why YouTube Editing Consistency Beats Occasional Viral Spikes',
    excerpt: 'Most channels stall when editing throughput fails, not when ideas run out.',
    category: 'youtube video editing',
    createdAt: '2026-03-03',
    content:
      '## Consistency compounds\nUpload rhythm helps audience trust and platform confidence.\n\n## Why editing becomes the bottleneck\nScripting, filming, and revisions pile up without a repeatable edit system.\n\n## Throughput framework\nUse templates, reusable motion assets, and defined revision windows.'
  },
  {
    title: 'Why Experienced Wedding Filmmakers Still Outsource Editing',
    excerpt:
      'As bookings increase, outsourcing protects quality and turnaround without sacrificing your brand style.',
    category: 'wedding video editing',
    createdAt: '2026-02-27',
    content:
      '## Growth pressure\nPeak season multiplies footage faster than internal post teams can absorb.\n\n## Outsourcing without losing style\nStyle guides, LUT stacks, and pacing references preserve your signature look.\n\n## Delivery impact\nConsistent turnaround improves referrals and client experience.'
  },
  {
    title: 'Peak Wedding Season Survival: Post-Production Systems That Scale',
    excerpt:
      'When bookings spike, post-production systems determine whether quality holds or delivery slips.',
    category: 'wedding video editing',
    createdAt: '2026-02-25',
    content:
      '## The seasonal trap\nShoots scale quickly, but editing capacity usually does not.\n\n## System essentials\nUse queue prioritization, pre-tagged footage folders, and milestone approvals.\n\n## Team communication\nShort daily syncs prevent silent delays.'
  },
  {
    title: 'Editing Wedding Films for Emotion Without Over-Editing',
    excerpt:
      'Emotion-first editing balances rhythm, silence, and music progression rather than stacking transitions.',
    category: 'wedding video editing',
    createdAt: '2026-02-20',
    content:
      '## Emotional pacing\nStrong wedding edits breathe between moments instead of rushing every beat.\n\n## Sound as structure\nAmbient audio and vows create the emotional spine of the story.\n\n## Avoid transition overload\nSimple cuts often feel more premium than excessive effects.'
  },
  {
    title: 'Why VFX Success Depends More on Process Than Tools',
    excerpt:
      'Better software alone cannot fix weak review cycles, unclear notes, or disorganized shot management.',
    category: 'vfx services',
    createdAt: '2026-01-21',
    content:
      '## Tool myth\nNew software helps, but process discipline drives repeatable quality.\n\n## Process pillars\nShot breakdown, annotated feedback, version control, and approval checkpoints are mandatory.\n\n## Team alignment\nDefine creative intent before production to reduce expensive revisions.'
  },
  {
    title: 'The Editing Bottleneck in YouTube Growth',
    excerpt:
      'Channels often hit a growth ceiling when post-production turnaround cannot keep pace with publishing goals.',
    category: 'youtube video editing',
    createdAt: '2026-01-16',
    content:
      '## Why growth stalls\nGreat ideas fail if publishing cadence breaks.\n\n## Bottleneck indicators\nMissed upload targets, rushed revisions, and inconsistent pacing are warning signs.\n\n## How to unblock\nBatch edit intros and reusable graphics.'
  },
  {
    title: 'The Hidden Cost of Editing Every Video In-House',
    excerpt:
      'In-house editing can feel cheaper until opportunity cost, burnout, and missed publishing windows stack up.',
    category: 'post production',
    createdAt: '2026-01-12',
    content:
      '## Cost beyond money\nTime spent editing is time not spent on strategy, sales, or creative development.\n\n## Capacity reality\nOne team handling everything usually creates quality swings.\n\n## Hybrid model\nKeep creative direction internal while outsourcing execution-heavy stages.'
  },
  {
    title: 'Build an Editing Style Guide That New Editors Can Follow',
    excerpt:
      'A style guide keeps your brand look consistent across episodes, formats, and team members.',
    category: 'workflow systems',
    createdAt: '2026-01-08',
    content:
      '## What to include\nPacing rules, text styles, transition usage, SFX levels, and color profile references.\n\n## Why it matters\nWithout documented standards, quality becomes editor-dependent.\n\n## Rollout approach\nReview one pilot edit, annotate it, and turn decisions into checklist items.'
  },
  {
    title: 'How to Collect Better Client Feedback in Fewer Rounds',
    excerpt:
      'Most revision chaos comes from vague notes. Structured feedback reduces cycle time dramatically.',
    category: 'post production',
    createdAt: '2025-12-27',
    content:
      '## Common note problems\nGeneric feedback is not actionable and delays final delivery.\n\n## Better feedback format\nUse timecode, issue type, intent, and expected outcome.\n\n## Review cadence\nSet one major notes round and one polish round for predictable delivery.'
  },
  {
    title: 'Color Grading Consistency Across Multi-Camera Shoots',
    excerpt:
      'Consistent color starts in camera matching and continues through disciplined correction workflow.',
    category: 'color grading',
    createdAt: '2025-12-22',
    content:
      '## Match before style\nNormalize exposure and white balance before creative grading.\n\n## LUT strategy\nUse conversion LUTs first, creative LUTs second, and tweak per scene.\n\n## QC checkpoints\nReview skin tones and highlight clipping on calibrated displays.'
  },
  {
    title: 'Sound Design That Improves Watch-Time',
    excerpt:
      'Sound cues and micro-transitions can improve retention by making edits feel intentional and energetic.',
    category: 'audio post production',
    createdAt: '2025-12-18',
    content:
      '## Why sound drives retention\nViewers feel pacing through audio before visual logic registers.\n\n## Practical stack\nUse subtle risers, impacts, ambience, and controlled ducking.\n\n## Avoid fatigue\nDo not over-layer SFX in every cut; use contrast and silence.'
  },
  {
    title: 'A Hook Framework for Shorts That Improves First-Second Retention',
    excerpt:
      'The first 1 to 2 seconds decide whether short-form viewers stay or swipe.',
    category: 'youtube video editing',
    createdAt: '2025-12-13',
    content:
      '## Hook types\nUse bold claim, pattern interrupt, or immediate result reveal.\n\n## Editing decisions\nLarge captions, punchy cuts, and reaction framing help signal momentum.\n\n## Validation\nCheck retention curve drop-off in first 3 seconds.'
  },
  {
    title: 'B-Roll Strategy for Better Story Flow',
    excerpt:
      'Great b-roll is not decoration; it resolves narrative gaps and emphasizes transitions in thought.',
    category: 'video editing company',
    createdAt: '2025-12-08',
    content:
      '## Purpose over quantity\nUse b-roll to answer viewer questions, not just fill silence.\n\n## Placement logic\nInsert b-roll at topic pivots, data points, and emotional beats.\n\n## Continuity\nMaintain angle and motion consistency to avoid jarring jumps.'
  },
  {
    title: 'How to Set a Revision Policy Clients Respect',
    excerpt:
      'Clear revision boundaries improve quality and delivery confidence for both clients and editors.',
    category: 'workflow systems',
    createdAt: '2025-12-01',
    content:
      '## Define scope early\nSet what counts as a revision versus a new creative direction.\n\n## Keep rounds finite\nTwo structured rounds often outperform endless micro-edits.\n\n## Communicate impact\nMajor scope shifts should update timeline and cost transparently.'
  },
  {
    title: 'Align Thumbnails and Editing for Better CTR + Retention',
    excerpt:
      'Packaging and delivery must match. Misaligned promise hurts retention and recommendation signals.',
    category: 'creator growth',
    createdAt: '2025-11-26',
    content:
      '## Promise matching\nThumbnail and title set expectation; intro edit must confirm it immediately.\n\n## Common mismatch\nOverhyped packaging with slow opening creates early abandonment.\n\n## Optimization loop\nReview CTR and first-30-second retention together.'
  },
  {
    title: 'Managing Remote Editors Without Slowing Production',
    excerpt:
      'Remote teams can move fast with clear ownership, asynchronous updates, and standardized review rituals.',
    category: 'workflow systems',
    createdAt: '2025-11-18',
    content:
      '## Ownership map\nDefine who approves creative, who checks technical QC, and who communicates with clients.\n\n## Async cadence\nUse daily status updates with blockers and ETAs.\n\n## Asset hygiene\nShared folder architecture prevents rework and version confusion.'
  },
  {
    title: 'Creative Briefs That Save Editing Time',
    excerpt:
      'A strong brief reduces revision rounds and aligns expectations before the first cut begins.',
    category: 'post production',
    createdAt: '2025-11-12',
    content:
      '## Brief essentials\nAudience, objective, tone, pacing references, and call-to-action are non-negotiable.\n\n## What to avoid\nDo not start with only raw footage and no storytelling objective.\n\n## Output planning\nSpecify all required formats at kickoff.'
  },
  {
    title: 'How to Deliver Faster First Drafts Without Quality Loss',
    excerpt:
      'Speed comes from pre-built systems and decision frameworks, not rushed editing sessions.',
    category: 'video editing company',
    createdAt: '2025-11-05',
    content:
      '## Pre-production leverage\nGood organization before editing starts cuts hours from first draft delivery.\n\n## Modular editing\nBuild reusable sequences for intros, CTAs, and branded elements.\n\n## Quality gate\nRun a fixed QC checklist before sending any draft.'
  },
  {
    title: 'Client Onboarding for Smoother Video Projects',
    excerpt:
      'Strong onboarding aligns goals, timelines, and communication expectations from day one.',
    category: 'post production',
    createdAt: '2025-10-29',
    content:
      '## First meeting priorities\nClarify goals, deadlines, and approval stakeholders immediately.\n\n## Tool setup\nSet review platform, feedback format, and asset delivery method upfront.\n\n## Risk prevention\nDiscuss common delays and fallback plans early.'
  },
  {
    title: 'Editing YouTube Series for Binge-Worthy Watch Paths',
    excerpt:
      'Series editing should reinforce continuity and predictable structure while keeping each episode fresh.',
    category: 'youtube video editing',
    createdAt: '2025-10-20',
    content:
      '## Episode architecture\nUse recurring segments and pacing anchors to build familiarity.\n\n## Continuity cues\nReintroduce stakes quickly and connect narrative threads.\n\n## End-screen strategy\nDesign transitions that naturally move viewers to episode two.'
  },
  {
    title: 'Wedding Highlight Film Structure That Feels Cinematic',
    excerpt:
      'Cinematic wedding edits are built on emotional arc, not just beautiful clips.',
    category: 'wedding video editing',
    createdAt: '2025-10-14',
    content:
      '## Emotional arc\nOpen with anticipation, build into ceremony intimacy, and close with celebratory release.\n\n## Audio layering\nUse vows and ambient sound to glue visual transitions.\n\n## Pacing control\nAlternate wide establishing shots with close emotional moments.'
  },
  {
    title: 'Final Delivery QC Checklist for Video Teams',
    excerpt:
      'A final checklist protects against preventable delivery errors and protects brand trust.',
    category: 'workflow systems',
    createdAt: '2025-10-08',
    content:
      '## Technical checks\nAspect ratio, audio peaks, caption sync, and export settings must be validated.\n\n## Creative checks\nEnsure CTA clarity, tone consistency, and narrative continuity.\n\n## Platform checks\nConfirm deliverables for YouTube, Reels, TikTok, and archive masters.'
  },
  {
    title: 'When to Use Motion Graphics and When to Keep It Minimal',
    excerpt:
      'Motion graphics should support clarity and rhythm, not distract from the message.',
    category: 'video editing company',
    createdAt: '2025-09-30',
    content:
      '## Purpose filter\nIf a graphic does not improve comprehension or retention, remove it.\n\n## Typography rules\nUse large readable text and limit simultaneous animation layers.\n\n## Brand consistency\nKeep color and animation behavior aligned with visual identity.'
  },
  {
    title: 'How to Price Post-Production Without Losing Margin',
    excerpt:
      'Pricing should reflect complexity, revision load, and turnaround commitments, not only runtime.',
    category: 'post production',
    createdAt: '2025-09-23',
    content:
      '## Pricing variables\nComplexity, footage quality, graphics scope, and review rounds all impact cost.\n\n## Margin traps\nUnderpricing revisions and rush timelines destroys profitability.\n\n## Packaging strategy\nOffer tiered plans with clear inclusions to reduce negotiation friction.'
  },
  {
    title: 'Communication Rhythm That Keeps Editing Projects Healthy',
    excerpt: 'Most delays are communication failures, not editing failures.',
    category: 'workflow systems',
    createdAt: '2025-09-17',
    content:
      '## Update cadence\nSend concise updates every 24 to 48 hours with status and blockers.\n\n## Message format\nUse what changed, what is pending, and what is needed from client.\n\n## Escalation rules\nDefine who resolves creative deadlocks and by when.'
  },
  {
    title: 'Building a Long-Term Creator + Editor Partnership',
    excerpt:
      'The best results come from continuity, trust, and feedback loops not one-off edits.',
    category: 'creator growth',
    createdAt: '2025-09-10',
    content:
      '## Why continuity wins\nEditors who know your voice can make faster and better decisions.\n\n## Feedback maturity\nSpecific and respectful feedback compounds quality over time.\n\n## Shared metrics\nReview CTR, retention, and watch time together each month.'
  }
];

async function getSeedAuthor() {
  let author = await User.findOne({ role: { $in: ['owner', 'admin'] } });

  if (!author) {
    const email = process.env.BLOG_SEED_ADMIN_EMAIL || 'admin@asrvisuals.local';
    const password = process.env.BLOG_SEED_ADMIN_PASSWORD || 'Admin@123456';

    author = await User.create({
      name: 'ASR Blog Admin',
      email,
      password,
      role: 'admin'
    });

    console.log(`Created seed author: ${email}`);
  }

  return author;
}

async function seedBlogs() {
  await connectDB();

  const author = await getSeedAuthor();

  let inserted = 0;
  let updated = 0;

  for (const seed of blogSeeds) {
    const payload = {
      title: seed.title,
      excerpt: seed.excerpt,
      content: seed.content,
      category: seed.category,
      author: author._id,
      published: true,
      createdAt: new Date(seed.createdAt)
    };

    const existing = await Blog.findOne({ title: seed.title });

    if (existing) {
      await Blog.updateOne({ _id: existing._id }, payload);
      updated += 1;
    } else {
      await Blog.create(payload);
      inserted += 1;
    }
  }

  const total = await Blog.countDocuments();
  console.log(`Blog seeding complete. Inserted: ${inserted}, Updated: ${updated}, Total blogs: ${total}`);
}

seedBlogs()
  .then(async () => {
    await Blog.db.close();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('Failed to seed blogs:', err);
    try {
      await Blog.db.close();
    } catch (closeErr) {
      console.error('Failed to close DB connection:', closeErr);
    }
    process.exit(1);
  });
