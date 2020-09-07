import React from "react"
import { Menu, MenuItem, IconButton, Grid } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"

function Notification(props) {
        const ITEM_HEIGHT = 20
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    const options = ['Remove']

    console.log(props)
    return (

        <>
            <Grid item>
                <IconButton
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
                {props.n.icon} {props.name} {props.n.notification}
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
}
export default Notification;
