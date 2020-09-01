import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom'

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

export default function RecipeReviewCard(props) {
    const classes = useStyles()
    const ITEM_HEIGHT = 48
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const options = [
        'Favorite',
        'Unfavorite',
    ];

    return (
        <div className='media-card'>
            <GridListTile key={`tile.img`}>
            <Link to={`creator/${props.id}`}>
                <img src={`https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/95/95e20ac0675bbb5a07a120e1d53f7cead53d44d5_full.jpg`} alt={`Gorgc`} />        
            </Link>
                <GridListTileBar
                    title={`Gorgc`}
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
            </GridListTile>
        </div>

    );
}
