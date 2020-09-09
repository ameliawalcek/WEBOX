import React from 'react'
import Loading from '../Loading';
import NoResults from './NoResults'
import MediaCard from './MediaCard'
import EmptyCard from './EmptyCard'
import Header from '../Header/Header'
import CategoryBar from './CategoryBar'
import { inject, observer } from 'mobx-react'
import { useLocation } from 'react-router-dom'
import { Grid, GridList, Paper } from '@material-ui/core'
import { useStyles } from "../styles/style";
import { useCreators } from '../../hooks/hooks';

const MediaCards = inject('userStore', 'mediaStore')(observer((props) => {
    const ref = useCreators(props.mediaStore);
    const location = useLocation()
    const classes = useStyles()
    const { isLoggedIn, favorites } = props.userStore;
    const { trending, loading, results } = props.mediaStore;

    const { media, header, mediaCard } =
        location.pathname === '/dashboard' && (!isLoggedIn || !favorites.length)
            ? { media: [], header: 'basic', mediaCard: false }
            : location.pathname === '/dashboard'
                ? { media: favorites, header: 'basic', mediaCard: true }
                : { media: trending, header: 'explore', mediaCard: true }

    const renderMediaCards = (media) => {
        return media.map((data, i) => {
            let isFavorite = favorites.some(f =>  data._id === f._id)

            if (header === 'explore' && media.length === i + 1) {
                return <MediaCard lastRef={ref} id={data._id} img={data.img} isFavorite={isFavorite} twitchName={data.twitch} key={data._id} />
            }
            return <MediaCard id={data._id} img={data.img} isFavorite={isFavorite} twitchName={data.twitch} key={Math.random()} />
        })
    }

    return (
        <>
            <Header page={header} />
            {header === 'explore' && <CategoryBar />}
            {header === 'dashboard' && <Paper className={classes.paperTopMedia}></Paper>}
            {mediaCard
                ? <Paper className={classes.paperMedia}>
                    <Grid container>
                        <GridList cellHeight={180} className={classes.rootMedia}>
                            {!loading && renderMediaCards(media)}
                            {loading && <Loading />}
                            {!results && <NoResults />}
                        </GridList>
                    </Grid>
                </Paper>
                : <EmptyCard />
            }
        </>
    )
}))

export default MediaCards