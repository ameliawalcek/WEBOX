import React from 'react';
import { Link } from 'react-router-dom';
import {
    GridListTile, GridListTileBar, IconButton,
    Menu, MenuItem, Grid, makeStyles, Snackbar
} from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MuiAlert from '@material-ui/lab/Alert';
 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));
 
const MediaCard = inject('userStore', 'mediaStore')(
    observer((props) => {
 
        const { img, twitchName, id, userStore, isFavorite } = props
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
            if(reason === 'backdropClick') { return }
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
            <Grid item xs={6} sm={4} md={4} lg={2}>
                <div className='media-card' style={{ backgroundImage: `url(${img})`, backgroundSize: '100% 100%' }}>
                    <GridListTile className={classes.gridList}>
                        <Link to={`creator/${id}`}>
                            <img className='card-img' src={`https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png`} alt={``} />
                        </Link>
                        <GridListTileBar
                            title={twitchName}
                            actionIcon={
                                <IconButton className={classes.icon} aria-label="more"
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
                                    maxHeight: '5ch',
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
                                Please login
                                </Alert>
                        </Snackbar>
 
                    </GridListTile>
                </div>
            </Grid>
        )
    }))
export default MediaCard