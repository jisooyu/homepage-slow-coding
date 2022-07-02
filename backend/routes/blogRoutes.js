const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getBlogs).post(protect, createBlog);

router
  .route("/:id")
  .get(protect, getBlog)
  .delete(protect, deleteBlog)
  .put(protect, updateBlog);

module.exports = router;
