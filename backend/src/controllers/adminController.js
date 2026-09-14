const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const SiteSetting = require('../models/SiteSetting');
const PageContent = require('../models/PageContent');
const catchAsync = require('../utils/catchAsync');

exports.getDashboardStats = catchAsync(async (req, res) => {
  const [
    blogs,
    portfolios,
    contacts,
    unreadContacts,
    users,
    pages,
    settings,
  ] = await Promise.all([
    Blog.countDocuments(),
    Portfolio.countDocuments(),
    Contact.countDocuments(),
    Contact.countDocuments({ status: 'new' }),
    User.countDocuments(),
    PageContent.countDocuments(),
    SiteSetting.countDocuments(),
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats: {
        blogs,
        portfolios,
        contacts,
        unreadContacts,
        users,
        pages,
        settings,
      },
    },
  });
});

exports.getSiteSettings = catchAsync(async (req, res) => {
  const records = await SiteSetting.find().sort({ key: 1 });

  const settings = records.reduce((acc, record) => {
    acc[record.key] = record.value;
    return acc;
  }, {});

  res.status(200).json({
    status: 'success',
    data: { settings },
  });
});

exports.upsertSiteSetting = catchAsync(async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  const setting = await SiteSetting.findOneAndUpdate(
    { key },
    { value, updatedBy: req.user.id },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: { setting },
  });
});

exports.getAllPages = catchAsync(async (req, res) => {
  const pages = await PageContent.find().sort({ slug: 1 });

  res.status(200).json({
    status: 'success',
    results: pages.length,
    data: { pages },
  });
});

exports.getPageBySlug = catchAsync(async (req, res) => {
  const page = await PageContent.findOne({ slug: req.params.slug });

  if (!page) {
    return res.status(404).json({
      status: 'fail',
      message: 'Page not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { page },
  });
});

exports.upsertPage = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const payload = {
    ...req.body,
    slug,
    updatedBy: req.user.id,
  };

  if (!payload.title) {
    payload.title = slug;
  }

  const page = await PageContent.findOneAndUpdate(
    { slug },
    payload,
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: { page },
  });
});

exports.deletePageBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const page = await PageContent.findOneAndDelete({ slug });

  if (!page) {
    return res.status(404).json({
      status: 'fail',
      message: 'Page not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: `Page deleted: ${slug}`,
  });
});

exports.updatePageSection = catchAsync(async (req, res) => {
  const { slug, sectionKey } = req.params;
  const updates = req.body || {};

  const page = await PageContent.findOne({ slug });

  if (!page) {
    return res.status(404).json({
      status: 'fail',
      message: 'Page not found',
    });
  }

  const existingIndex = page.sections.findIndex((section) => section.key === sectionKey);

  if (existingIndex === -1) {
    page.sections.push({ key: sectionKey, ...updates });
  } else {
    page.sections[existingIndex] = {
      ...page.sections[existingIndex].toObject(),
      ...updates,
      key: sectionKey,
    };
  }

  page.updatedBy = req.user.id;
  await page.save();

  res.status(200).json({
    status: 'success',
    data: { page },
  });
});

exports.getWebsiteSnapshot = catchAsync(async (req, res) => {
  const [settingsRecords, pages, blogs, portfolios] = await Promise.all([
    SiteSetting.find().sort({ key: 1 }),
    PageContent.find().sort({ slug: 1 }),
    Blog.find().sort({ createdAt: -1 }).limit(50),
    Portfolio.find().sort({ createdAt: -1 }).limit(50),
  ]);

  const settings = settingsRecords.reduce((acc, record) => {
    acc[record.key] = record.value;
    return acc;
  }, {});

  res.status(200).json({
    status: 'success',
    data: {
      settings,
      pages,
      blogs,
      portfolios,
    },
  });
});
