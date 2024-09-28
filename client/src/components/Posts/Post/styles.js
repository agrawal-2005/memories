import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '400px', // Set a fixed height for the initial view
    position: 'relative',
    overflow: 'hidden',
    transition: 'height 0.3s ease',
    paddingBottom: '4px'
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
    marginBottom: '8px', // Add margin for spacing
    textAlign: 'left', // Align title text to the left
  },
  content: {
    flexGrow: 1,
    padding: '0 16px', // Add padding for content
    overflowY: 'auto',
    textAlign: 'left', // Align content text to the left
  },
  cardActions: {
    padding: '8px 16px', // Add padding to CardActions
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginLeft: '8px', // Fixed margin between buttons
    marginBottom: '8px', // Add margin to ensure buttons don't touch the bottom
  },
});
