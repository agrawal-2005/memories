import React, {useEffect} from 'react'
import Pagination from '@mui/lab/Pagination'
import { PaginationItem } from '@mui/material'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'

const Paginate = ({ page }) => {
    const {numberOfPages} = useSelector(state => state.posts);
    // console.log(numberOfPages);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(getPosts(page));
    }, [page, dispatch])

    return(
        <Pagination 
            classes = {{ul : classes.ul}}
            count = {numberOfPages}
            page = {Number(page) || 1}
            variant = "outlined"
            color = "primary"
            renderItem = {(item) => (
                <PaginationItem {...item} component = {Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate