const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

const getJwtExpiresIn = () => {
  const raw = process.env.JWT_EXPIRES_IN;
  if (!raw) {
    return '7d';
  }

  const normalized = String(raw).trim().replace(/^['\"]|['\"]$/g, '');
  return normalized || '7d';
};

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: getJwtExpiresIn() }
  );
};

const buildAuthResponse = (user) => {
  const token = signToken(user);

  const normalizedUser = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  return {
    token,
    id: normalizedUser.id,
    name: normalizedUser.name,
    email: normalizedUser.email,
    role: normalizedUser.role,
    createdAt: normalizedUser.createdAt,
    user: normalizedUser,
  };
};

exports.register = catchAsync(async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.create({ email, password, name });
  const auth = buildAuthResponse(user);

  res.status(201).json({
    status: 'success',
    data: auth,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password',
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password',
    });
  }

  const auth = buildAuthResponse(user);

  res.status(200).json({
    status: 'success',
    data: auth,
  });
});

exports.logout = catchAsync(async (req, res) => {
  res.status(200).json({ status: 'success' });
});

exports.me = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});

exports.bootstrapOwner = catchAsync(async (req, res) => {
  const { setupKey, email, password, name } = req.body;

  if (!process.env.OWNER_SETUP_KEY) {
    return res.status(400).json({
      status: 'fail',
      message: 'Owner setup is not configured on server',
    });
  }

  if (!setupKey || setupKey !== process.env.OWNER_SETUP_KEY) {
    return res.status(403).json({
      status: 'fail',
      message: 'Invalid owner setup key',
    });
  }

  const existingOwner = await User.findOne({ role: 'owner' });
  if (existingOwner) {
    return res.status(409).json({
      status: 'fail',
      message: 'Owner account already exists',
    });
  }

  const owner = await User.create({
    email,
    password,
    name,
    role: 'owner',
  });

  const auth = buildAuthResponse(owner);

  res.status(201).json({
    status: 'success',
    data: auth,
  });
});
