const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', portfolioController.getAllPortfolio);
router.get('/:id', portfolioController.getPortfolioById);
router.post('/', protect, authorize('owner', 'admin'), portfolioController.createPortfolio);
router.patch('/:id', protect, authorize('owner', 'admin'), portfolioController.updatePortfolio);
router.delete('/:id', protect, authorize('owner', 'admin'), portfolioController.deletePortfolio);

module.exports = router;
