import axios from "axios";

// Create an Axios instance
const API = axios.create({ baseURL: "http://localhost:4000" });

// Request interceptor to attach token to headers
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  
  if (profile) {
    const { token } = JSON.parse(profile);
    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }
    // console.log("Request Headers:", req.headers); // Debugging line
  }

  return req;
}, (error) => {
  // Handle request error
  return Promise.reject(error);
});

// Response interceptor to handle errors (such as token expiration)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized: User not found or token expired, logging out...");
      localStorage.removeItem('profile'); // Remove the token from local storage
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);


// API calls for posts
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// API calls for user authentication
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
