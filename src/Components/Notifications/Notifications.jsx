import React from 'react';
import Header from '../Header/Header';
import Notification from './Notification';
import NoResults from '../MediaCards/NoResults';
import { Paper, Grid, Icon } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import pngwave from '../assets/pngwave.png';
import { useStyles } from '../styles/style';
import { inject, observer } from 'mobx-react';

const notificationDesign = [
  {
    site: 'twitter',
    icon: <TwitterIcon style={{ color: '#1da1f2', marginBottom: -5 }} fontSize='small' />,
    notification: 'posted a new tweet!',
  },
  {
    site: 'youTube',
    icon: <YouTubeIcon style={{ color: '#FF0000', marginBottom: -5 }} fontSize='small' />,
    notification: 'posted a new video',
  },
  {
    site: 'instagram',
    icon: <img src={pngwave} alt='instagram' style={{ height: '20px', marginBottom: -5 }} />,
    notification: 'shared a new photo',
  },
  {
    site: 'twitch',
    icon: (
      <Icon
        className='fab fa-twitch'
        fontSize='small'
        style={{ color: '#9853ff', marginBottom: -5 }}
      />
    ),
    notification: 'is live!',
  },
];

const Notifications = inject('userStore')(
  observer((props) => {
    const classes = useStyles();
    const { notifications } = props.userStore;
    return (
      <>
        <Header page={'basic'} />
        {notifications.length ? (
          <Paper className={classes.rootNotif}>
            <Paper
              className={classes.paperNotif}
              elevation={0}
              style={{ marginTop: 50 }}
            >
              <Grid container wrap='nowrap' spacing={2}>
                <Grid item xs>
                  {notifications.map((n) => {
                    if (n.mediaSource === 'twitter') {
                      return (
                        <Notification
                          notification={n}
                          p={props.userStore}
                          n={notificationDesign[0]}
                          key={n._id}
                          name={n.creatorName}
                        />
                      );
                    } else if (n.mediaSource === 'youtube') {
                      return (
                        <Notification
                          notification={n}
                          p={props.userStore}
                          n={notificationDesign[1]}
                          key={n._id}
                          name={n.creatorName}
                        />
                      );
                    } else if (n.mediaSource === 'instagram') {
                      return (
                        <Notification
                          notification={n}
                          p={props.userStore}
                          n={notificationDesign[2]}
                          key={n._id}
                          name={n.creatorName}
                        />
                      );
                    } else {
                      return (
                        <Notification
                          notification={n}
                          p={props.userStore}
                          n={notificationDesign[3]}
                          key={n._id}
                          name={n.creatorName}
                        />
                      );
                    }
                  })}
                </Grid>
              </Grid>
            </Paper>
          </Paper>
        ) : (
          <Paper square={true} style={{ paddingTop: 80 }}>
            <NoResults />
          </Paper>
        )}
      </>
    );
  })
);
export default Notifications;
