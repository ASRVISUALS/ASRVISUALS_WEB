const express = require('express');
const contactController = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', contactController.createContact);
router.get('/', protect, authorize('owner', 'admin'), contactController.getAllContacts);
router.get('/:id', protect, authorize('owner', 'admin'), contactController.getContactById);
router.patch('/:id/status', protect, authorize('owner', 'admin'), contactController.updateContactStatus);
router.delete('/:id', protect, authorize('owner', 'admin'), contactController.deleteContact);

module.exports = router;
