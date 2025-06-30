import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});

// ✅ Attach token only if it exists AND the endpoint is not login/register
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const isAuthRoute = config.url.includes('/auth/login') || config.url.includes('/auth/register');

    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ TOKEN SENT:', token);
    } else {
      console.log('🚫 NO TOKEN SENT or exempted route:', config.url);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Posts
export const fetchPosts = (page, keyword = '') => API.get(`/posts?pageNumber=${page}&keyword=${keyword}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (postData) => API.post('/posts', postData);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Auth
export const register = (userData) => API.post('/auth/register', userData);
export const login = (credentials) => API.post('/auth/login', credentials);
export const logout = () => API.post('/auth/logout');
export const getCurrentUser = () => API.get('/auth/me');

// Comments
export const addComment = (postId, commentData) => API.post(`/posts/${postId}/comments`, commentData);

// Categories
export const fetchCategories = () => API.get('/categories');
export const createCategory = (categoryData) => API.post('/categories', categoryData);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
//userDashboard
export const getDashboardData = async () => {
  try {
    const response = await API.get('/users/dashboard');
    
    // Ensure response exists and has data
    if (!response || !response.data) {
      throw new Error('Invalid server response');
    }
    
    return response; // Return the complete response
  } catch (error) {
    console.error('API Error Details:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    throw error;
  }
};
// function to fetch a specific user
export const getUser = (userId) => API.get(`/users/${userId}`);

// Update user profile
export const updateUser = (userId, userData) => API.put(`/users/${userId}`, userData);

// Upload user profile image
export const uploadProfileImage = (formData) => 
  API.post('/users/upload-profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
