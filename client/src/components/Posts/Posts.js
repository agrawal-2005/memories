import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import useStyle from "./styles";

const Posts = ({ setCurrentId }) => {
  const {posts, isLoading} = useSelector((state) => state.posts);
  // console.log("Posts state:", posts, "Is Loading:", isLoading);
  const classes = useStyle();

  if(!posts.length && !isLoading) return 'No Posts';

  return isLoading ? (<CircularProgress />):(
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  )
};

export default Posts;
