import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GridListTile,
  GridListTileBar,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  makeStyles,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
  const { img, twitchName, id } = props;
  const classes = useStyles();
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = ['Favorite', 'Unfavorite'];

  return (
    <Grid item xs={6} sm={4} md={4} lg={2}>
      <div
        className='media-card'
        style={{ backgroundImage: `url(${img})`, backgroundSize: '100% 100%' }}
      >
        <GridListTile className={classes.gridList}>
          <Link to={`creator/${id}`}>
            <img
              className='card-img'
              src={`https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png`}
              alt={``}
            />
          </Link>
          <GridListTileBar
            title={twitchName}
            actionIcon={
              <IconButton
                className={classes.icon}
                aria-label='more'
                aria-controls='long-menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            }
          />
          <Menu
            id='long-menu'
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
              <MenuItem
                key={option}
                selected={option === 'Pyxis'}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </GridListTile>
      </div>
    </Grid>
  );
}
