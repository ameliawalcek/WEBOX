import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import SearchBar from './SearchBar'
import CreatorHeader from './CreatorHeader'
import {
    AppBar, Toolbar, IconButton, Badge, Menu,createMuiTheme, ThemeProvider, Switch,
    ListItem, ListItemText, Drawer, List, Divider, ListItemIcon, makeStyles, useTheme
} from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExploreIcon from '@material-ui/icons/Explore'
import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import { orange, lightBlue, deepPurple, deepOrange } from "@material-ui/core/colors"

const drawerWidth = 180

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}))

export default function Header(props) {
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    
    const classes = useStyles()
    const theme = useTheme()
    
    const [darkState, setDarkState] = useState(false)
    const palletType = darkState ? "dark" : "light"
    const mainPrimaryColor = darkState ? orange[500] : lightBlue[500]
    const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500]
    

    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            }
        }
    })

    const handleThemeChange = () => {
        setDarkState(!darkState)
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        handleMobileMenuClose()
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        ></Menu>
    )

    const mobileMenuId = 'primary-search-account-menu-mobile'
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
        </Menu>
    )

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.grow}>
                <AppBar
                    position='sticky'
                    color='primary'
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        {props.page === 'explore' ? <SearchBar />
                            : props.page === 'creator' ? <CreatorHeader />
                                : null}

                        <div className={classes.grow} />
                        <IconButton button component={Link} to="/notifications" aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to="/dashboard">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary={`Dashboard`} />
                        </ListItem>
                        <ListItem button component={Link} to="/explore">
                            <ListItemIcon><ExploreIcon /></ListItemIcon>
                            <ListItemText primary={`Explore`} />
                        </ListItem>
                        <ListItem button component={Link} to="/notifications">
                            <ListItemIcon><NotificationsIcon /></ListItemIcon>
                            <ListItemText primary={`Notifications`} />
                        </ListItem>
                        <ListItem >
                            <ListItemIcon><Switch checked={darkState} onChange={handleThemeChange} /></ListItemIcon>
                            <ListItemText primary={`Dark Mode`} />
                        </ListItem>
                    </List>
                </Drawer>
            </div >
        </ThemeProvider>
    )
}
