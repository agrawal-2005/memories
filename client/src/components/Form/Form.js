import React, { useEffect, useState } from "react";
import useStyle from "./styles";
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatedPost } from "../../actions/posts";

function Form({ currentId, setCurrentId }) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: null,
  });
  const classes = useStyle();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSumbit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatedPost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSumbit}
      >
        <Typography variant="h4" align="center" className={classes.title}>
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <Grid container spacing={1}> {/* Reduced spacing */}
          <Grid item xs={12}>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              className={classes.textField}
              margin="dense" // Reducing margin
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="message"
              variant="outlined"
              label="Message"
              fullWidth
              multiline
              minRows={4}
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
              className={classes.textField}
              margin="dense" // Reducing margin
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(',') })
              }
              className={classes.textField}
              margin="dense" // Reducing margin
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.fileInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              style={{ marginTop: "8px", marginBottom: "8px" }} // Reducing margin
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth
              style={{ marginTop: "8px", marginBottom: "8px" }} // Reducing margin
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default Form;
