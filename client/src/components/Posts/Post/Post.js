import React, { useState } from "react";
import moment from "moment";
import { Card, CardContent, CardActions, CardMedia, Button, Typography, ButtonBase } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletedPost, likePost } from "../../../actions/posts";
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showFullMessage, setShowFullMessage] = useState(false);
  const navigate = useNavigate();
  const maxLength = 60;

  const Likes = () => {
    const isLiked = post.likes.includes(user?.result?.googleId || user?.result?._id);
    const likeCount = post.likes.length;

    return (
      <>
        {isLiked ? (
          <>
            <ThumbUpAltIcon fontSize="small" />
            &nbsp;{likeCount > 1 ? `You and ${likeCount - 1} other${likeCount > 2 ? "s" : ""}` : "You like this"}
          </>
        ) : (
          <>
            <ThumbUpOutlinedIcon fontSize="small" />
            &nbsp;{likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </>
        )}
      </>
    );
  };

  const toggleShowFullMessage = () => setShowFullMessage((prev) => !prev);

  const openPost = () => navigate(`/posts/${post._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardActions} onClick={openPost} disableRipple style={{ display: 'block' }}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile || "defaultImage.jpg"}
          title={post.title || "No Title"}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
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
            {showFullMessage || post.message.length <= maxLength ? post.message : `${post.message.substring(0, maxLength)}...`}
            {post.message.length > maxLength && (
              <Button onClick={toggleShowFullMessage} size="small">
                {showFullMessage ? "Show Less" : "Read More"}
              </Button>
            )}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          className={classes.button} // Apply the button class
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button
            className={classes.button} // Apply the button class
            size="small"
            color="primary"
            onClick={() => dispatch(deletedPost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
