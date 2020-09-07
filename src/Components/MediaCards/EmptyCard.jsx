import React from 'react'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Typography, Grid, Paper } from '@material-ui/core'
import LandingButton from '../Landing/LandingButton'

const EmptyCard = inject('userStore')(observer((props) => {
    let { isLoggedIn } = props.userStore

    return (
        <Paper>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                align="center"
                style={{ minHeight: '100vh'}}
            >
                <Grid item xs={10} sm={6} md={6} lg={6} style={{position: 'fixed' }}>
                    <Typography color='primary' style={{ fontSize: 60 }}>
                        <i className="fas fa-home"></i>
                    </Typography>
                    <>
                        <Typography variant="h6" gutterBottom>
                            {!isLoggedIn
                                ? `Media Dashboard`
                                : `Your dashboard lives here`
                            }
                        </Typography>

                        <Typography variant="body2" gutterBottom >
                            {
                                !isLoggedIn
                                    ? `Login to start favoriting creators and view their live streams, videos, and posts in one place`
                                    : `Find your favorite creators and view their live streams,videos and posts in one place.`
                            }
                        </Typography>
                        <LandingButton text={'EXPLORE'} to={"/explore"} />
                        {
                            !isLoggedIn &&
                            <Typography color='secondary'>
                                <Link to='/auth/login' style={{ textDecoration: 'none' }}>LOGIN</Link>
                            </Typography>
                        }
                    </>
                </Grid>
            </Grid>
        </Paper>
    )
}))

export default EmptyCard