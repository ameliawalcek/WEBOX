import React from 'react';
import { observer, inject } from 'mobx-react'
import { Typography, Grid, Button, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';

const EmptyCard = inject('userStore', 'mediaStore')(observer((props) => {
    let { isLoggedIn } = props.userStore

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            align="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={8} sm={6} md={6} lg={6}>
                {isLoggedIn === false
                    ? <> <Typography  variant="h6" gutterBottom>
                        Media Dashboard
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Login to start favoriting creators and view their live
                                streams, videos, and posts in one place</Typography></>
                    
                    : <> <Typography variant="h6" gutterBottom>
                        Your dashboard lives here
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            Find your favorite creators and view their live streams,
                                videos and posts in one place.</Typography></>
                }
                <CardActions style={{ justifyContent: 'center' }}>
                    <Button component={Link} to="/explore" size="small" variant="contained" color="primary">
                        Explore </Button>
                </CardActions >
            </Grid>
        </Grid>
    )
}))

export default EmptyCard;