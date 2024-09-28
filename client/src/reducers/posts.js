import { FETCH_ALL, UPDATE, DELETE, CREATE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST } from "../constants/actionTypes";

const postsReducer = (state = {isLoading: true, posts: []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading: true}
    case END_LOADING:
      return {...state, isLoading: false}
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      };
    case FETCH_POST:
      return {
        ...state, post: action.payload.post
      }
    case FETCH_BY_SEARCH:
      return {
        ...state, posts: action.payload.data
      };
    case CREATE:
      return {...state, posts: [...state.posts, action.payload]};
    case UPDATE:
      // console.log('Update action payload:', action.payload); // Add this log
      return {...state, posts: state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )};
    case DELETE:
      return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
    // case "LIKE":
    //   return posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );
    default:
      return state;
  }
};

export default postsReducer;
