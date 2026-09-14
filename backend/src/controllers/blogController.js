const Blog = require('../models/Blog');
const catchAsync = require('../utils/catchAsync');

exports.getAllBlogs = catchAsync(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: {
      blogs,
    },
  });
});

exports.getBlogById = catchAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      status: 'fail',
      message: 'Blog post not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
});

exports.createBlog = catchAsync(async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    author: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      blog,
    },
  });
});

exports.updateBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, {
    ...req.body,
    updatedAt: new Date(),
  }, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      blog,
    },
  });
});

exports.deleteBlog = catchAsync(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
  });
});
