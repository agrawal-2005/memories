import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    flexWrap: 'wrap', // Allow wrapping of recommended posts
    justifyContent: 'space-around', // Distribute space evenly
    margin: '20px 0', // Add top and bottom margin
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  recommendedPost: {
    background: '#f9f9f9',
    height: '300px',
    width: '250px',
    padding: '20px',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: '0.3s',
    position: 'relative', // To position title and name overlay
    overflow: 'hidden', // Prevent content overflow
    '&:hover': {
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)', // Enhanced shadow on hover
    },
  },
  recommendedImage: {
    width: '100%', // Full width of the container
    height: '150px', // Fixed height for uniformity
    objectFit: 'cover', // Maintain aspect ratio while covering the container
    borderRadius: '10px',
    marginBottom: '10px', // Add space below the image
  },
  nameBackground: {
    position: 'absolute',
    top: '144px',
    right: '20px',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.6)',
    padding: '2px',
    borderRadius: '5px',
    zIndex: 2,
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
}));
