import React from "react"
import Header from "../Header/Header"
import Notification from "./Notification"
import { Paper, Grid, Icon } from "@material-ui/core"
import YouTubeIcon from "@material-ui/icons/YouTube"
import TwitterIcon from "@material-ui/icons/Twitter"
import pngwave from "../assets/pngwave.png"
import { useStyles } from "../styles/style";

const notifications = [
    { site: "twitter", icon: <TwitterIcon style={{ color: "#1da1f2" }} fontSize="large" />, notification: "" },
    { site: "youTube", icon: <YouTubeIcon style={{ color: "#FF0000" }} fontSize="large" />, notification: "" },
    { site: "instegram", icon: <img src={pngwave} alt="instegram" style={{ height: "30px" }} />, notification: "" },
    { site: "twitch", icon: <Icon className="fab fa-twitch" fontSize="large" style={{ color: "#9147ff" }} />, notification: "" }
]

function Notifications(props) {
    const classes = useStyles()

    return (
        <Paper className={classes.rootNotif}>
            <Header page={"basic"} />
            <Paper className={classes.paperNotif} {...props} elevation={0}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs>
                        {notifications.map(n => (
                            <Notification n={n} key={n.site} />
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </Paper>
    )
}
export default Notifications;
