import React from "react"
import Header from "../Header/Header"
import Notification from "./Notification"
import NoResults from "../MediaCards/NoResults"
import { Paper, Grid, Icon } from "@material-ui/core"
import YouTubeIcon from "@material-ui/icons/YouTube"
import TwitterIcon from "@material-ui/icons/Twitter"
import pngwave from "../assets/pngwave.png"
import { useStyles } from "../styles/style";
import { inject, observer } from 'mobx-react'

const notificationIcons = [
    { site: "twitter", icon: <TwitterIcon style={{ color: "#1da1f2" }} fontSize="large" />, notification: "" },
    { site: "youTube", icon: <YouTubeIcon style={{ color: "#FF0000" }} fontSize="large" />, notification: "" },
    { site: "instagram", icon: <img src={pngwave} alt="instagram" style={{ height: "30px" }} />, notification: "" },
    { site: "twitch", icon: <Icon className="fab fa-twitch" fontSize="large" style={{ color: "#9147ff" }} />, notification: "" }
]

const Notifications = inject('userStore')(observer((props) => {
    const classes = useStyles()
    const { notifications } = props.userStore

    return (
        <Paper className={classes.rootNotif}>
            <Header page={"basic"} />
            {notifications.length
                ? <Paper className={classes.paperNotif} {...props} elevation={0}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            {notificationIcons.map(n => (
                                <Notification n={n} key={n.site} />
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
                : <NoResults />
            }
        </Paper>
    )
}))
export default Notifications;
