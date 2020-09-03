import React from 'react'
import Header from '../Header/Header'
import MediaCard from './MediaCard'
import EmptyCard from './EmptyCard'
import CategoryBar from './CategoryBar'
import { inject, observer } from 'mobx-react'
import { useLocation } from 'react-router-dom'
import { Grid, GridList, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    container: {
        marginTop: 5,
    },
    paper: {
        height: '100vh'
    }
}))

const MediaCards = inject('userStore', 'mediaStore')(observer((props) => {
    const location = useLocation()
    const classes = useStyles()

    let { isLoggedIn, favorites } = props.userStore
    let { trending, searchResults } = props.mediaStore

    const { media, header, mediaCard } =
        location.pathname === '/dashboard' && (!isLoggedIn || !favorites.length)
            ? { media: [], header: 'basic', mediaCard: false }

            : location.pathname === '/dashboard'
                ? { media: favorites, header: 'basic', mediaCard: true }

                : { media: trending, header: 'explore', mediaCard: true }

    const renderMediaCard = (data) => {
        return data.map((d) => {
            let isFavorite = favorites.some(d._id === favorites._id )
            return (
                <MediaCard id={d._id} img={d.img} isFavorite={isFavorite} twitchName={d.twitch} key={d._id} />
            )
        })
    }

    return (
        <>
            <Header page={header} />
            {header === 'explore' && <CategoryBar />}
            {mediaCard
                ? <Paper className={classes.paper}>
                    <Grid container className={header === 'explore' && classes.container}>
                        <GridList cellHeight={180} className={classes.root}>
                            {searchResults.length
                                ? renderMediaCard(searchResults)
                                : renderMediaCard(media)}
                        </GridList>
                    </Grid>
                </Paper>
                : <EmptyCard />
            }
        </>
    )
}))
export default MediaCards
