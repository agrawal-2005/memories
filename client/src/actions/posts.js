import { FETCH_ALL, COMMENT, FETCH_POST, FETCH_BY_SEARCH, UPDATE, DELETE, CREATE, START_LOADING, END_LOADING } from "../constants/actionTypes";
import * as api from "../api";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {data} = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.error("Error fetching posts:", error.response ? error.response.data : error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const {data} = await api.fetchPosts(page);
    // console.log("Response:", data);
    // console.log('Fetched Posts:', response.data);
    dispatch({type: END_LOADING})
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.error("Error fetching posts:", error.response ? error.response.data : error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data : { data } } = await api.fetchPostsBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } })
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const {data} = await api.createPost(post);
    // console.log("Response:", response);
    // console.log('Fetched Posts:', response.data);
    navigate(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data });
    // dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const updatedPost = (id, post) => async (dispatch) => {
  try {
    // console.log('Updating post with id:', id);  // Check id
    // console.log('Post content:', post);         // Check post data
    const { data } = await api.updatePost(id, post);
    // console.log('Updated post response:', data); // Check the response from the server
    dispatch({ type: UPDATE, payload: data });
    dispatch({type: END_LOADING})
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
    // console.log("data", data);
    dispatch({ type: UPDATE, payload: data })   //LIKE
  } catch (error) {
    console.log(error);
  }
}

export const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(comment, id);

    // console.log(data);
    dispatch({ type: COMMENT, payload: data })
    return data.comments
  } catch (error) {
    console.log(error);
  }
}