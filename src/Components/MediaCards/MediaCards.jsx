import React from 'react'
import Header from '../Header/Header'
import MediaCard from './MediaCard'
import EmptyCard from './EmptyCard'
import CategoryBar from './CategoryBar'
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
    container: {
        marginTop: 50
    }
}));

const MediaCards = inject('userStore', 'mediaStore')(observer((props) => {
    const location = useLocation()
    const classes = useStyles();
    let { isLoggedIn, favorites } = props.userStore
    let { trending, searchResults } = props.mediaStore

    const { media, header, mediaCard }
        = location.pathname === '/dashboard' && (!isLoggedIn || !favorites.length)
            ? { media: null, header: 'basic', mediaCard: false }

            : location.pathname === '/dashboard'
                ? { media: favorites, header: 'basic', mediaCard: true }

                : { media: trending, header: 'explore', mediaCard: true }

    const renderMediaCard = (data) => {
        data.map(d => {
            return <MediaCard id={d._id} img={d.img} creator={d.creator} />
        })
    }

    return (
        <>
            <Header page={header} />
            {header === 'explore' && <CategoryBar />}
            {mediaCard
                ? <Grid container className={header === 'explore' && classes.container} justify="flex-start" >
                    <GridList cellHeight={180} className={classes.gridList}>
                        {/* {searchResults.length
                            ? renderMediaCard(searchResults)
                            : renderMediaCard(media)
                        } */}
                        < MediaCard />
                        <MediaCard />
                        <MediaCard />
                        <MediaCard />
                        <MediaCard />
                        <MediaCard />
                        <MediaCard />
                    </GridList>
                </Grid>

                : <EmptyCard />
            }
        </>
    )
}))

export default MediaCards