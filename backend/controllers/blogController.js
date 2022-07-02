const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Blog = require("../models/blogModel");

// @desc    Get user blogs
// @route   GET /api/blogs
// @access  Private
const getBlogs = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const blogs = await Blog.find({ user: req.user.id });
  res.status(200).json(blogs);
});

// @desc    Get user blog
// @route   GET /api/blogs/:id
const getBlog = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(blog);
});

// @desc    Delete user blog
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await blog.remove();

  res.status(200).json({ success: true });
});

// @desc    Update user blog
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  const { category, title, status, contentState } = req.body;
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // find the blog using blog id
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { category, title, status, contentState },
    {
      new: true,
    }
  );

  res.status(200).json(updatedBlog);
});

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  const { category, title, status, contentState } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("Please add a title");
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // blog creation
  const blogData = await Blog.create({
    user: req.user.id,
    category,
    title,
    status,
    contentState,
  });
  res.status(201).json(blogData);
});

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
