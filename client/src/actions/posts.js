import { FETCH_ALL, UPDATE, DELETE, CREATE } from "../constants/actionTypes";
import * as api from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await api.fetchPosts();
    console.log("Response:", response);
    console.log('Fetched Posts:', response.data);
    dispatch({ type: FETCH_ALL, payload: response.data });
  } catch (error) {
    console.error("Error fetching posts:", error.response ? error.response.data : error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const response = await api.createPost(post);
    console.log("Response:", response);
    console.log('Fetched Posts:', response.data);
    dispatch({ type: CREATE, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletedPost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    console.log("data", data);
    dispatch({ type: UPDATE, payload: data })   //LIKE
  } catch (error) {
    console.log(error);
  }
}