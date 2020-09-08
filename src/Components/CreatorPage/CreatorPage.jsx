import React from 'react';
import { observer, inject } from 'mobx-react';
import Header from '../Header/Header';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Paper, List } from '@material-ui/core';
import { useStyles } from '../styles/style';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import InstagramEmbed from 'react-instagram-embed';

const CreatorPage = inject(
  'creatorStore',
  'userStore'
)(
  observer((props) => {
    const { creatorStore, userStore } = props;
    const { creator } = creatorStore;
    const { pathname } = useLocation();

    const creatorId = pathname.split('/')[2];
    const classes = useStyles();

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
          <Header page={'creator'} creatorId={creatorId} img={creator.imgUrl} />
          <iframe
            title='twitch-embed'
            src={`https://player.twitch.tv/?channel=${creator.twitchName}&parent=webox-hub.com`}
            height='500'
            width='100%'
            frameBorder='0'
            allowFullScreen={true}
          ></iframe>
          <iframe
            title={creator.twitchName + ' chat'}
            frameBorder='0'
            src={`https://www.twitch.tv/embed/${creator.twitchName}/chat?parent=webox-hub.com`}
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
          )}
          {creator.instagramPostId && (
            <div className={classes.instagram}>
              <InstagramEmbed
                url={`https://instagr.am/p/${creator.instagramPostId}/`}
                maxWidth={1000}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
              />
            </div>
          )}
          {creator.twitterName && (
            <List>
              <TwitterTimelineEmbed
                sourceType='profile'
                screenName={creator.twitterName}
                options={{ height: 550 }}
                theme={userStore.darkState ? 'dark' : 'light'}
              />
            </List>
          )}
        </Paper>
      </Paper>
    );
  })
);

export default CreatorPage;
