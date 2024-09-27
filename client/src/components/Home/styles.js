import { makeStyles } from '@material-ui/core/styles'

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
}));
