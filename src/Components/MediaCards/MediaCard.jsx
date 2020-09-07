import React from 'react';
import { Link } from 'react-router-dom';
import {
    GridListTile, GridListTileBar, IconButton,
    Menu, MenuItem, Grid, Snackbar, Typography
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MuiAlert from '@material-ui/lab/Alert';
import { useStyles } from "../styles/style";

const MediaCard = inject('userStore')(observer((props) => {
    const { img, twitchName, id, userStore, isFavorite, lastRef } = props
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const [openSnack, setOpen] = React.useState(false);

    const menuLabel = isFavorite ? 'Unfavorite' : 'Favorite'
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        setAnchorEl(null)
        if (reason === 'backdropClick') { return }
        if (userStore.isLoggedIn) {
            menuLabel === 'Favorite'
                ? userStore.saveFavorite(id)
                : userStore.deleteFavorite(id)
        } else {
            setOpen(true)
        }
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <Grid item xs={6} sm={3} md={2} lg={2}>
            <div ref={lastRef ? lastRef : null} className='media-card' style={{ backgroundImage: `url(${img})`, backgroundSize: '100% 100%' }}>
                <GridListTile >
                    <Link to={`creator/${id}`}>
                        <img className='card-img' src={`https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png`} alt={``} />
                    </Link>
                    <GridListTileBar
                        title={twitchName}
                        actionIcon={
                            <IconButton className={classes.iconMedia} aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                        }
                    />
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: '10ch',
                                width: '15ch',
                            },
                        }}
                    >
                        <MenuItem key={id} value={id} onClick={handleClose}>
                            {menuLabel}
                        </MenuItem>
                    </Menu>
                    <Snackbar open={openSnack} onClose={handleSnackBarClose} autoHideDuration={3000}>
                        <Alert severity="info" onClose={handleSnackBarClose}>
                            <Typography>
                                <Link to='/auth/login' style={{ textDecoration: 'none', color: 'white' }}>Please login</Link>
                            </Typography>
                        </Alert>
                    </Snackbar>
                </GridListTile>
            </div>
        </Grid>
    )
}))
export default MediaCard