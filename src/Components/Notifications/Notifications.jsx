import React from "react";
import { observer, inject } from "mobx-react";
import Header from "../Header/Header";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import pngwave from "../assets/pngwave.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3)
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2)
  }
}));

const notifications = [
  { site: "twitter", icon: <TwitterIcon style={{ color: "#1da1f2" }} fontSize="large" />, notification: "" },
  { site: "youTube", icon: <YouTubeIcon style={{ color: "#FF0000" }} fontSize="large" />, notification: "" },
  { site: "instegram", icon: <img src={pngwave} alt="instegram" style={{ height: "30px" }} />, notification: "" },
  { site: "twitch", icon: <Icon className="fab fa-twitch" fontSize="large" style={{ color: "#9147ff" }} />, notification: "" }
];

const Notifications = inject("userStore", "mediaStore")(
  observer(props => {
    const classes = useStyles();

    return (
      <div>
        <Header page={"basic"} />
        <div className={classes.root}>
          <Paper className={classes.paper} {...props} elevation={0}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>{}</Grid>
              <Grid item xs>
                {notifications.map(n => (
                    <Typography key={Math.random()}>
                    <Grid item>
                      <MoreVertIcon fontSize="small" verticalAlign="-webkit-baseline-middle" />
                      {n.icon} {n.notification}
                    </Grid>
                    </Typography>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  })
);

export default Notifications;
