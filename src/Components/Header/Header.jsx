import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import SearchBar from './SearchBar';
import CreatorHeader from './CreatorHeader';
import {
  AppBar, Toolbar, IconButton, Badge, Menu, Switch, ListItem, ListItemText,
  Drawer, List, Divider, ListItemIcon, useTheme, Button, Avatar
} from '@material-ui/core';
import Brightness2RoundedIcon from '@material-ui/icons/Brightness2Rounded';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExploreIcon from '@material-ui/icons/Explore';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from "../styles/style";
import LogoDark from "../assets/LogoDark.png"
import LogoLight from "../assets/LogoLight.png"

const Header = inject('userStore')(observer((props) => {
  const { darkState, handleDarkStateChange, isLoggedIn, notificationLength, cookieLogOut } = props.userStore;

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const classes = useStyles();
  const theme = useTheme();

  const icons = [
    { icon: <HomeIcon />, link: '/dashboard', title: `Dashboard` },
    { icon: <ExploreIcon />, link: '/explore', title: `Explore` },
    { icon: <NotificationsIcon />, link: '/notifications', title: `Notifications` }
  ]

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogOut = () => cookieLogOut()

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    ></Menu>
  );

  return (
    <div className={classes.growHeader}>
      <AppBar
        className={classes.customizeToolbar}
      >
        <Toolbar>
          <IconButton
            style={{ margin: 0 }}
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButtonHeader, open && classes.hideHeader)}
          >
            <MenuIcon />
          </IconButton>
          {darkState
            ? <Link to='/explore' ><img src={LogoDark} alt="Webox" style={{ height: "30px", width: 95 }} /></Link>
            : <Link to='/explore' ><img src={LogoLight} alt="Webox" style={{ height: "30px", width: 95 }} /></Link>
          }
          {props.page === 'creator' &&
            <Avatar
              alt={''}
              src={props.img}
              className={classes.largeCreatorTwo}
            />
          }
          {props.page === 'explore' ? (
            <SearchBar />
          ) : props.page === 'creator' ? (
            <CreatorHeader creatorId={props.creatorId} />
          ) : null}
          <div className={classes.growHeader} />
          <IconButton
            component={Link}
            to='/notifications'
            color='inherit'
          >
            <Badge badgeContent={notificationLength} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        className={classes.drawerHeader}
        variant='temporary'
        onBackdropClick={handleDrawerClose}
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaperHeader,
        }}
      >
        <div className={classes.drawerHeaderHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
                <ChevronRightIcon />
              )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.listHightHeader}>
          {icons.map(i => {
            return (
              <ListItem button component={Link} to={i.link} key={Math.random()}>
                <ListItemIcon>
                  {i.icon}
                </ListItemIcon>
                <ListItemText primary={i.title} />
              </ListItem>
            )
          })}
          <ListItem>
            <ListItemIcon>
              {darkState
                ? <Brightness2RoundedIcon fontSize='small' />
                : <Brightness4Icon />
              }
            </ListItemIcon>
            <ListItemIcon>
              <Switch checked={darkState} onChange={handleDarkStateChange} />
            </ListItemIcon>
          </ListItem>
          {!isLoggedIn
            ? < ListItem className={classes.listHeader} >
              <Button variant="contained" color="secondary" href="/auth/login">
                Login
                </Button>
            </ListItem>
            : <ListItem className={classes.listHeader} >
              <Button variant="contained" onClick={handleLogOut} color="primary" href="/auth/login">
                Logout
              </Button>
            </ListItem>
          }
        </List>
      </Drawer>
    </div >
  );
})
);

export default Header;