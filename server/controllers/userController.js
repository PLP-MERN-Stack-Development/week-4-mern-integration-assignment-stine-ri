import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import User from '../models/User.js';

export const getUserDashboard = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found',
        data: null 
      });
    }

    const posts = await Post.find({ author: req.user._id })
      .populate('category', 'name')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      message: 'Dashboard data retrieved',
      data: {
        user,
        posts,
        postCount: posts.length
      }
    });
  } catch (error) {
    console.error('Dashboard controller error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
});
// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  try {
    console.log("UpdateUser - Params ID:", req.params.id);
    console.log("UpdateUser - Body:", req.body);

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only update if fields exist in body
    user.username = req.body.username ?? user.username;
    user.email = req.body.email ?? user.email;
    user.bio = req.body.bio ?? user.bio;
    user.profileImage = req.body.profileImage ?? user.profileImage;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error("UpdateUser - ERROR:", error); // 👈 this will help us see the real problem
    res.status(500).json({ message: error.message });
  }
};
