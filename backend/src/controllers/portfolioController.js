const Portfolio = require('../models/Portfolio');
const catchAsync = require('../utils/catchAsync');

exports.getAllPortfolio = catchAsync(async (req, res) => {
  const portfolios = await Portfolio.find();

  res.status(200).json({
    status: 'success',
    results: portfolios.length,
    data: {
      portfolios,
    },
  });
});

exports.getPortfolioById = catchAsync(async (req, res) => {
  const portfolio = await Portfolio.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      portfolio,
    },
  });
});

exports.createPortfolio = catchAsync(async (req, res) => {
  const portfolio = await Portfolio.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      portfolio,
    },
  });
});

exports.updatePortfolio = catchAsync(async (req, res) => {
  const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      portfolio,
    },
  });
});

exports.deletePortfolio = catchAsync(async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
  });
});
