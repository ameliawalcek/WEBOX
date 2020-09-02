import React from 'react'
import Header from '../Header/Header'
import MediaCard from './MediaCard'
import EmptyCard from './EmptyCard'
import { inject, observer } from 'mobx-react'
import { useLocation } from 'react-router-dom'
import { Grid, GridList, makeStyles } from "@material-ui/core";

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

const MediaCards = inject('userStore', 'mediaStore')(observer((props) => {
    const location = useLocation()
    const classes = useStyles();
    let { userStore, mediaStore } = props
    let media

    return (
        <>
            {location.pathname === '/dashboard'
                ? <Header page={'basic'} /> && (media = userStore.favorites || null)
                : <Header page={'explore'} /> && (media = mediaStore.trending)}

            {userStore.isLoggedIn === false || userStore.favorites.length === 0
                ? <EmptyCard />
                :
                <Grid container spacing={16} justify="flex-start" >
                    <GridList cellHeight={180} className={classes.gridList}>
                        {/* {userStore.media.map(m => {
                            return <MediaCard id={m._id} img={m.img} creator={m.creator} />
                        })} */}
                        <MediaCard />
                        <MediaCard />
                        <MediaCard />
                        <MediaCard />
                        <MediaCard />
                        <MediaCard />
                        <MediaCard />
                    </GridList>
                </Grid>}

        </>
    )
}))

export default MediaCards