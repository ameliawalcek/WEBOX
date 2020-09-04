import React from 'react'
import Header from '../Header/Header'
import MediaCard from './MediaCard'
import EmptyCard from './EmptyCard'
import CategoryBar from './CategoryBar'
import { inject, observer } from 'mobx-react'
import { useLocation } from 'react-router-dom'
import { Grid, GridList, Paper } from '@material-ui/core'
import { useStyles } from "../styles/style";

const MediaCards = inject('userStore', 'mediaStore')(observer((props) => {
    const location = useLocation()
    const classes = useStyles()

    let { isLoggedIn, favorites } = props.userStore
    let { trending } = props.mediaStore

    const { media, header, mediaCard } =
        location.pathname === '/dashboard' && (!isLoggedIn || !favorites.length)
            ? { media: [], header: 'basic', mediaCard: false }

            : location.pathname === '/dashboard'
                ? { media: favorites, header: 'basic', mediaCard: true }

                : { media: trending, header: 'explore', mediaCard: true }

    const renderMediaCard = (data) => {
        let isFavorite = favorites.some(f => data._id === f._id)
        let creator = data.twitch.toLowerCase()
        return (
            creator.includes(props.mediaStore.searchInput.toLowerCase())
                ? <MediaCard id={data._id} img={data.img} isFavorite={isFavorite} twitchName={data.twitch} key={data._id} />
                : <div>No creators</div>
        )
    }

    return (
        <>
            <Header page={header} />
            {header === 'explore' && <CategoryBar />}
            {mediaCard
                ? <Paper className={classes.paperMedia}>
                    <Grid container className={header === 'explore' && classes.containerMedia}>
                        <GridList cellHeight={180} className={classes.rootMedia}>
                            {media.map(m => renderMediaCard(m))}
                        </GridList>
                    </Grid>
                </Paper>
                : <EmptyCard />
            }
        </>
    )
}))
export default MediaCards