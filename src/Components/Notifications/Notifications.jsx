import React from "react"
import { observer, inject } from "mobx-react"
import Header from "../Header/Header"
import Notification from "./Notification"
import { Paper, makeStyles, Grid, Icon } from "@material-ui/core"
import YouTubeIcon from "@material-ui/icons/YouTube"
import TwitterIcon from "@material-ui/icons/Twitter"
import pngwave from "../assets/pngwave.png"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: "hidden",
        height: '100vh',
        padding: theme.spacing(0, 3)
    },
    paper: {
        maxWidth: 400,

        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2)
    }
}))

const notifications = [
    { site: "twitter", icon: <TwitterIcon style={{ color: "#1da1f2" }} fontSize="large" />, notification: "" },
    { site: "youTube", icon: <YouTubeIcon style={{ color: "#FF0000" }} fontSize="large" />, notification: "" },
    { site: "instegram", icon: <img src={pngwave} alt="instegram" style={{ height: "30px" }} />, notification: "" },
    { site: "twitch", icon: <Icon className="fab fa-twitch" fontSize="large" style={{ color: "#9147ff" }} />, notification: "" }
]

const Notifications = inject("mediaStore")(observer(props => {
    const classes = useStyles()

    return (
        <Paper>
            <Header page={"basic"} />
            <div className={classes.root}>
                <Paper className={classes.paper} {...props} elevation={0}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>{}</Grid>
                        <Grid item xs>
                            {notifications.map(n => (
                                <Notification n={n} />
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </Paper>

    )
})
)

export default Notifications;
