import React, { useState } from "react";
import { Container, Grow, Grid, AppBar, TextField, Paper } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import useStyles from "./styles";
import ChipInput from 'material-ui-chip-input'; // Import ChipInput
import { Button } from "@mui/material";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   if (search || tags.length) {
  //     dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
  //   } else {
  //     dispatch(getPosts()); // Fetch all posts if no search or tags
  //   }
  // }, [currentId, dispatch, search, tags]);

  const searchPost = () => {
    if(search.trim() || tags){
      dispatch(getPostsBySearch({search, tags: tags.join(',')}))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else{
      // dispatch(getPosts());
      navigate('/');
    }
  };
  const handleKeyPress = (e) => {
    if(e.key === 13){
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag])

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer} >
          <Grid item xs={12} sm={6} md={5} lg={6}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={7} lg={5}>
            <AppBar position="static" color="inherit" className={classes.appBarSearch}>
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyDownCapture={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {/* <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0' }}>
                {tags.map((tag) => (
                  <Chip  key={tag} label={tag} onDelete={handleDelete(tag)} />
                ))}
                <TextField variant="outlined" label="Search Tags" value={tags} onAdd={handleAdd} />
              </div> */}
              <ChipInput 
                style = {{ margin: '10px 0'}}
                value = {tags}
                onAdd = {handleAdd}
                onDelete = {handleDelete}
                label = "Search Tags"
                varient = "outlined"
              />
              <Button onClick={searchPost} color="primary" variant="contained"> Search </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} className={ classes.pagination } />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
