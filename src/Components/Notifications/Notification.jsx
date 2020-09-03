import React from "react"
import { observer, inject } from "mobx-react"
import { Menu, MenuItem, IconButton, makeStyles, Grid } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"

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

const Notification = inject("mediaStore")(observer(props => {
    const classes = useStyles()
    const ITEM_HEIGHT = 20
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const options = ['Remove']

    return (
        <>
            <Grid item>
                <IconButton className={classes.icon} aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
                {props.n.icon} {props.n.notification}
            </Grid>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
})
)

export default Notification;
