import React from 'react';
import Header from '../Header/Header';
import MediaCard from './MediaCard';
import EmptyCard from './EmptyCard';
import CategoryBar from './CategoryBar';
import { inject, observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import { Grid, GridList, makeStyles, Paper } from '@material-ui/core';
import Loading from '../Loading';
import { useCreators } from '../../hooks/hooks';

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
    height: '100vh',
  },
}));

const MediaCards = inject(
  'userStore',
  'mediaStore'
)(
  observer((props) => {
    const ref = useCreators(props.mediaStore);
    const location = useLocation();
    const classes = useStyles();

    const { isLoggedIn, favorites } = props.userStore;
    const { trending, searchResults, loading } = props.mediaStore;

    const { media, header, mediaCard } =
      location.pathname === '/dashboard' && (!isLoggedIn || !favorites.length)
        ? { media: [], header: 'basic', mediaCard: false }
        : location.pathname === '/dashboard'
        ? { media: favorites, header: 'basic', mediaCard: true }
        : { media: trending, header: 'explore', mediaCard: true };

    const renderMediaCard = (data) => {
      return data.map((d, i) => {
        let isFavorite = favorites.some((f) => d._id === f._id);
        if (location.pathname === '/explore') {
          if (data.length === i + 1) {
            return (
              <MediaCard
                lastRef={ref}
                id={d._id}
                img={d.img}
                isFavorite={isFavorite}
                twitchName={d.twitch}
                key={d._id}
              />
            );
          }
        }
        return (
          <MediaCard
            id={d._id}
            img={d.img}
            isFavorite={isFavorite}
            twitchName={d.twitch}
            key={d._id}
          />
        );
      });
    };

    return (
      <>
        <Header page={header} />
        {header === 'explore' && <CategoryBar />}
        {mediaCard ? (
          <Paper className={classes.paper}>
            <Grid
              container
              className={header === 'explore' && classes.container}
            >
              <GridList cellHeight={180} className={classes.root}>
                {searchResults.length
                  ? renderMediaCard(searchResults)
                  : renderMediaCard(media)}
                {loading && <Loading />}
              </GridList>
            </Grid>
          </Paper>
        ) : (
          <EmptyCard />
        )}
      </>
    );
  })
);
export default MediaCards;
