import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  gridContainer: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '10px',
  },
  // Additional styles for the Posts section
  postsContainer: {
    height: 'calc(100vh - 200px)', // Adjust height as needed
    overflowY: 'auto', // Allow scrolling if content exceeds height
  },
}));
