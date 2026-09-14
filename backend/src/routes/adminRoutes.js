const express = require('express');
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('owner', 'admin'));
router.use((req, res, next) => {
	res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
	res.set('Pragma', 'no-cache');
	res.set('Expires', '0');
	next();
});

router.get('/dashboard', adminController.getDashboardStats);

router.get('/settings', adminController.getSiteSettings);
router.put('/settings/:key', adminController.upsertSiteSetting);

router.get('/pages', adminController.getAllPages);
router.get('/pages/:slug', adminController.getPageBySlug);
router.put('/pages/:slug', adminController.upsertPage);
router.delete('/pages/:slug', adminController.deletePageBySlug);
router.patch('/pages/:slug/sections/:sectionKey', adminController.updatePageSection);

router.get('/snapshot', adminController.getWebsiteSnapshot);

module.exports = router;
