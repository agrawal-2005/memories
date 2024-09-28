import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { getPost, getPosts } from "../../actions/posts";
import { Grid } from "@material-ui/core";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { posts, post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  // State for image preview and modal
  const [imagePreview, setImagePreview] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    // Set the image preview to the selected file or the default image
    setImagePreview(
      post?.selectedFile ||
      "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
    );
  }, [post]);

  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  };

  const handleImageClick = (event) => {
    const img = new Image();
    img.src = imagePreview;
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      setOpenModal(true); // Open the modal
    };
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
  };

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  if (!post) return null;

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div
            className={classes.imageSection}
            style={{ flex: "1", maxWidth: "400px" }}
          >
            {/* Main image preview with click event to open modal */}
            <img
              src={imagePreview}
              alt={post.title}
              onClick={handleImageClick} // Click event
              style={{
                width: "100%", // Image takes full width of its container
                height: "300px", // Fixed height
                objectFit: "cover", // Ensures the image covers the area
                objectPosition: "center", // Centers the image
                borderRadius: "10px", // Small border radius for the image
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Adds shadow
                cursor: "pointer", // Change cursor to pointer
              }}
            />
          </div>
          <div
            className={classes.section}
            style={{ flex: "2", paddingLeft: "20px" }}
          >
            <Typography variant="h3" component="h2">
              {post.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post.message}
            </Typography>
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">
              {moment(post.createdAt).fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Realtime Chat - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <CommentSection post={post} />
            <Divider style={{ margin: "20px 0" }} />
          </div>
        </div>
      </div>

      {/* Modal for enlarged image */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth={false}>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={imagePreview}
            alt={post.title}
            style={{
              maxWidth: `${imageSize.width}px`, // Set width based on image size
              maxHeight: "80vh", // Max height of the modal to avoid overflow
              objectFit: "contain", // Maintain aspect ratio without cropping
              borderRadius: "10px", // Small border radius for the enlarged image
            }}
          />
        </DialogContent>
      </Dialog>

      {recommendedPosts.length > 0 && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <Grid container spacing={2} className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  style={{
                    margin: "20px",
                    cursor: "pointer",
                    position: "relative",
                    flex: "1 1 300px", // Ensures flexibility
                    maxWidth: "300px", // Limits the maximum width
                  }}
                  onClick={() => openPost(_id)}
                  key={_id}
                  className={classes.recommendedPost}
                >
                  <img
                    src={selectedFile}
                    width="100%"
                    className={classes.recommendedImage}
                    alt={title}
                  />
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    className={classes.nameBackground}
                  >
                    {name}
                  </Typography>
                  <div>
                    <Typography gutterBottom variant="h5">
                      {title}
                    </Typography>
                  </div>
                  {/* Truncate long messages */}
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    style={{
                      maxHeight: "50px", // Limit the message display area
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap", // Make the text fit in one line with ellipsis
                    }}
                  >
                    {message.length > 100
                      ? `${message.substring(0, 100)}...`
                      : message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                </div>
              )
            )}
          </Grid>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
