import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: theme.shadows[5],
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
  fileInput: {
    width: '100%',
    margin: '10px 0',
  },
  buttonSubmit: {
    margin: theme.spacing(2, 0),
  },
}));