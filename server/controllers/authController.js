import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  try {
    console.log('📝 Registration started'); // Add this
    const { username, email, password, isAdmin } = req.body;
    
    console.log('🔍 Checking for existing user...');
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      console.log('❌ User exists:', email);
      res.status(400);
      throw new Error('User already exists');
    }

    console.log('🛠 Creating user...');
    const user = await User.create({
      username, 
      email, 
      password,
      isAdmin: isAdmin || false
    });

    console.log('✅ User created:', user.email);
    console.log('🔐 Hashed password:', user.password); // Verify hash exists

    const token = generateToken(user._id);
    console.log('🆕 Token generated');

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token
    });

  } catch (error) {
    console.error('💥 Registration failed:', error);
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});


// ✅ @desc    Login user
// ✅ @route   POST /api/auth/login
// ✅ @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  console.log('🔑 Login attempt:', { email }); // Don't log actual password

  const user = await User.findOne({ email });
  console.log('👤 Found user:', user ? user.email : 'none');

  if (!user) {
    console.log('❌ User not found');
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = await user.matchPassword(password);
  console.log('🔐 Password match:', isPasswordValid);
  
  if (!isPasswordValid) {
    console.log('❌ Invalid password');
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user._id);
  console.log('🆕 Generated token');

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
});



// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});

// @desc    Logout user (for token-based auth, this is usually frontend-based)
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  // For token-based auth, nothing much to do server-side unless using refresh tokens
  res.status(200).json({ message: 'User logged out' });
});

// 🔐 Generate JWT
const generateToken = (id) => {
  console.log('🔐 Generating token for:', id);
  console.log('⏳ Expires in:', process.env.JWT_EXPIRE);
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
  console.log('🆕 Token generated');
  return token;
};
