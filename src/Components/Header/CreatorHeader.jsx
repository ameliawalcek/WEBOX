import React from 'react';
import { observer, inject } from 'mobx-react'
import { makeStyles, Button, Avatar, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const CreatorHeader = inject('userStore', 'mediaStore')(observer((props) => {
    const classes = useStyles();

    return (
        <>
            <MenuItem>
                <div className={classes.root}>
                    <Avatar alt="ALT NAME" src="/static/images/avatar/1.jpg" className={classes.large} />
                </div>
            </MenuItem>

                <Button size="small" variant="contained" color="default">
                    Favorite
      </Button>
                <Button size="small" variant="outlined" color="default" >
                    Unfavorite
      </Button>
        </>

    )
}))

export default CreatorHeader;