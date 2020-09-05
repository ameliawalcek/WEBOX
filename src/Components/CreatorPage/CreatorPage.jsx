import React from 'react';
import { observer, inject } from 'mobx-react';
import Header from '../Header/Header';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScript } from '../../hooks/hooks';
import { Paper, List } from '@material-ui/core';
import { useStyles } from "../styles/style";

const CreatorPage = inject('creatorStore')(observer((props) => {
  const { creatorStore } = props;
  const { creator } = creatorStore;
  const { pathname } = useLocation();
  const creatorId = pathname.split('/')[2]
  const classes = useStyles()

  useScript('//cdn.embedly.com/widgets/platform.js');
  useScript('https://platform.twitter.com/widgets.js');

  useEffect(() => {
    creatorStore.getCreatorById(pathname.split('/')[2]);

    return () => {
      creatorStore.cleanCreatorData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper className={classes.rootCreator}>
      <Paper className={classes.paperCreator}>
        <Header page={'creator'} creatorId={creatorId}/>
        {/* <iframe
          title='twitch-embed'
          src={`https://player.twitch.tv/?channel=${creator.twitchName}&parent=localhost`}
          height='500'
          width='100%'
          frameBorder='0'
          allowFullScreen={true}
        ></iframe>
        <iframe
          title={creator.twitchName + ' chat'}
          frameBorder='0'
          src={`https://www.twitch.tv/embed/${creator.twitchName}/chat?parent=localhost`}
          height='500'
          width='100%'
        ></iframe>
        {creator.youtubeVideoId && (
          <iframe
            title={creator.youtubeVideoId}
            frameBorder='0'
            src={`https://www.youtube.com/embed/${creator.youtubeVideoId}`}
            height='250px'
            width='100%'
            allowFullScreen={true}
          ></iframe>
        )} */}
        {creator.instagramPostId && (
          <a
            className='embedly-card'
            style={{ height: '50%' }}
            data-card-controls='0'
            data-card-width='100%'
            href={`https://instagram.com/p/${creator.instagramPostId}/`}
          >
            {' '}
          </a>
        )}
        {creator.twitterName && (
          <Paper style={{ maxHeight: 650, overflow: 'auto' }}>
            <List>
              <a
                className='twitter-timeline'
                href={`https://twitter.com/${creator.twitterName}?ref_src=twsrc%5Etfw`}
              >
                Tweets by {creator.twitterName}
              </a>
            </List>
          </Paper>
        )}
      </Paper>
    </Paper>
  );
})
);

export default CreatorPage;
