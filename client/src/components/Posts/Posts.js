import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import Post from "./Post/Post";
import useStyle from "./styles";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyle();

  // console.log("Posts from useSelector:", posts);

  if (!posts) return <CircularProgress />;

  return posts.length > 0 ? (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant="h6" className={classes.emptyState}>
      No posts available
    </Typography>
  );
};

export default Posts;
