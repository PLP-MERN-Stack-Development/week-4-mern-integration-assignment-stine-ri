import Post from '../models/Post.js';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  
  const keyword = req.query.keyword ? {
    title: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {};

  const count = await Post.countDocuments({ ...keyword });
  const posts = await Post.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('category', 'name')
    .populate('author', 'name');

  res.json({ posts, page, pages: Math.ceil(count / pageSize) });
});
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

export const uploadPostImage = upload.single('image');

export const createPost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  
  const post = new Post({
    title,
    content,
    category,
    author: req.user._id,
    image: req.file ? `/uploads/${req.file.filename}` : null
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});
export const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    const comment = {
      text,
      user: req.user._id
    };

    post.comments.push(comment);
    await post.save();
    res.status(201).json({ message: 'Comment added' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  await post.remove();
  res.status(200).json({ message: 'Post removed' });
});

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('category', 'name')
    .populate('author', 'name');

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});
// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Optionally check if the logged-in user is the author:
  // if (post.author.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error('Not authorized to update this post');
  // }

  post.title = title || post.title;
  post.content = content || post.content;
  post.category = category || post.category;

  const updatedPost = await post.save();
  res.status(200).json(updatedPost);
});

