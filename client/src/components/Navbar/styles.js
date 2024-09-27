import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "20px 0",
    padding: "10px 20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: theme.shadows[4] || "0px 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: theme.palette.background.paper || "#fff",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  heading: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    textAlign: "center",
    fontSize: "clamp(2rem, 4vw, 3rem)", // Responsive font size
    marginRight: "20px", // Adjusted margin to space out from the image
    textDecoration: "none", // Remove underline
  },
  image: {
    marginLeft: "15px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      marginBottom: "10px",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "10px", // Space between profile elements
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  userName: {
    fontSize: "1.2rem",
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  logout: {
    marginLeft: "20px", // Space between profile name and logout button
  },
}));
