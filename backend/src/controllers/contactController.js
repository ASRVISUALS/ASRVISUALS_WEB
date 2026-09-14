const Contact = require('../models/Contact');
const catchAsync = require('../utils/catchAsync');

exports.createContact = catchAsync(async (req, res) => {
  const { name, email, youtubeLink, projectDescription, services } = req.body;

  // Validation
  if (!name || !email || !youtubeLink || !projectDescription || !services || services.length === 0) {
    return res.status(400).json({
      status: 'failure',
      message: 'Please provide all required fields: name, email, youtubeLink, projectDescription, and at least one service',
    });
  }

  const payload = {
    name,
    email,
    youtubeLink,
    projectDescription,
    services,
    subject: `Project Inquiry: ${services.join(', ')}`,
    message: projectDescription,
  };

  const contact = await Contact.create(payload);

  res.status(201).json({
    status: 'success',
    message: 'Contact form submitted successfully',
    data: {
      contact,
    },
  });
});

exports.getAllContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    status: 'success',
    results: contacts.length,
    data: {
      contacts,
    },
  });
});

exports.getContactById = catchAsync(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.updateContactStatus = catchAsync(async (req, res) => {
  const { status } = req.body;

  if (!['new', 'read', 'responded'].includes(status)) {
    return res.status(400).json({
      status: 'failure',
      message: 'Invalid status. Allowed values are: new, read, responded',
    });
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!contact) {
    return res.status(404).json({
      status: 'failure',
      message: 'Contact not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      contact,
    },
  });
});

exports.deleteContact = catchAsync(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
  });
});
