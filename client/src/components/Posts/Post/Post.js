import React, { useState } from "react";
import moment from "moment";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletedPost, likePost } from "../../../actions/posts";

function Post({ post, setCurrentId }) {
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showFullMessage, setShowFullMessage] = useState(false);

  const Likes = () => {
    const isLiked = post.likes.includes(user?.result?.googleId || user?.result?._id);
    const likeCount = post.likes.length;

    // Show the correct like message based on conditions
    if (isLiked) {
      return (
        <>
          <ThumbUpAltIcon fontSize="small" />&nbsp;
          {likeCount > 1 ? `You and ${likeCount - 1} others` : 'You like this'}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpOutlinedIcon fontSize="small" />&nbsp;
          {likeCount}{likeCount === 1 ? 'Like' : 'Likes'}
        </>
      );
    }
  };

  const toggleShowFullMessage = () => setShowFullMessage(!showFullMessage);

  const maxLength = 60; // Set the max length for truncation

  return (
    <Card className={`${classes.card} ${showFullMessage ? classes.expandedCard : ''}`}>
      <CardMedia className={classes.media} image={post.selectedFile} // Ensure you provide a fallback image title={post.title || "No Title"}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button sx={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary" component="p">
          {showFullMessage || post.message.length <= maxLength
            ? post.message
            : `${post.message.substring(0, maxLength)}...`}
          {post.message.length > maxLength && (
            <Button onClick={toggleShowFullMessage} size="small">
              {showFullMessage ? "Show Less" : "Read More"}
            </Button>
          )}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletedPost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
