import React from 'react';
import { observer, inject } from 'mobx-react';
import Header from '../Header/Header';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Paper, List, Icon } from '@material-ui/core';
import { useStyles } from '../styles/style';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import InstagramEmbed from 'react-instagram-embed';
import YouTubeIcon from "@material-ui/icons/YouTube"
import TwitterIcon from "@material-ui/icons/Twitter"
import pngwave from "../assets/pngwave.png"

const CreatorPage = inject(
  'creatorStore',
  'userStore',
  'mediaStore'
)(
  observer((props) => {
    const { creatorStore, userStore, mediaStore } = props;
    const { creator } = creatorStore;
    const { pathname } = useLocation();
    const creatorId = pathname.split('/')[2];
    const classes = useStyles();
    mediaStore.setInput('')

    useEffect(() => {
      creatorStore.getCreatorById(pathname.split('/')[2]);

      return () => {
        creatorStore.cleanCreatorData();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <Paper className={classes.paperCreator} square='true' >
        <Header page={'creator'} creatorId={creatorId} img={creator.imgUrl} />
        <Icon className="fab fa-twitch" fontSize="large" style={{ color: "#9853ff", height: "30px", paddingTop: 5, paddingBottom: 10 }} />
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
          <>
            <YouTubeIcon style={{ color: "#FF0000", paddingTop: 30, paddingBottom: 10 }} fontSize="large" />            
           <iframe
              title={creator.youtubeVideoId}
              frameBorder='0'
              src={`https://www.youtube.com/embed/${creator.youtubeVideoId}`}
              height='500'
              width='100%'
              allowFullScreen={true}
            ></iframe></>
        )}
        {creator.instagramPostId && (
          <><img src={pngwave} alt="instagram" style={{ height: "30px", paddingTop: 30, paddingBottom: 10 }} />
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
            </div></>
        )}
        {creator.twitterName && (
          <><TwitterIcon style={{ height: "30px", paddingTop: 30, color: "#1da1f2" }} fontSize="large" />
            <List>
              <TwitterTimelineEmbed
                sourceType='profile'
                screenName={creator.twitterName}
                options={{ height: 550 }}
                theme={userStore.darkState ? 'dark' : 'light'}
              />
            </List></>
        )}
      </Paper>
    );
  })
);

export default CreatorPage;
