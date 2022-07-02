import axios from "axios";

const API_URL = "/api/blogs/";

// Create new blog
const createBlog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, blogData, config);
  return response.data;
};

// Get user blogs
const getBlogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get a blog
const getBlog = async (blogid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + blogid, config);
  return response.data;
};

// Update a blog
const updateBlog = async (blogData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + blogData.blogid, blogData, config);

  return response.data;
};

const blogService = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
};

export default blogService;
