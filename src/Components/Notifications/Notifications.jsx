import React from "react";
import Header from "../Header/Header";
import { inject, observer } from "mobx-react";
import Notification from "./Notification";
import { Paper, Grid, Icon } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import pngwave from "../assets/pngwave.png";
import { useStyles } from "../styles/style";

const notificationDesign = [
  {
    site: "twitter",
    icon: <TwitterIcon style={{ color: "#1da1f2" }} fontSize="large" />,
    notification: "just went live!",
  },
  {
    site: "youTube",
    icon: <YouTubeIcon style={{ color: "#FF0000" }} fontSize="large" />,
    notification: "released a new video",
  },
  {
    site: "instagram",
    icon: <img src={pngwave} alt="instagram" style={{ height: "30px" }} />,
    notification: "shared a new photo",
  },
  {
    site: "twitch",
    icon: (
      <Icon
        className="fab fa-twitch"
        fontSize="large"
        style={{ color: "#9147ff" }}
      />
    ),
    notification: "is live!",
  },
];

const Notifications = inject("userStore")(
  observer((props) => {
    const classes = useStyles();
    const { notifications } = props.userStore;
    return (
      <Paper className={classes.rootNotif}>
        <Header page={"basic"} />
        <Paper className={classes.paperNotif} {...props} elevation={0}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              {notifications.map((n) => {
                if (n.mediaSource === "twitter") {
                  return (
                    <Notification  notification={n} p={props.userStore} n={notificationDesign[0]} key={n.creatorName} name={n.creatorName} />
                 );
                } else if (n.mediaSource === "youtube") {
                  return (
                    <Notification notification={n} p={props.userStore} n={notificationDesign[1]} key={n.creatorName} name={n.creatorName} />
                  );
                } else if (n.mediaSource === "instagram") {
                  return (
                    <Notification notification={n} p={props.userStore} n={notificationDesign[2]} key={n.creatorName} name={n.creatorName} />
                  );
                } else {
                  return (
                    <Notification notification={n} p={props.userStore} n={notificationDesign[3]} key={n.creatorName} name={n.creatorName} />
                  );
                }
              })}
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    );
  })
);
export default Notifications;
