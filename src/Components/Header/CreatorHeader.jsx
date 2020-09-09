import React from 'react'
import { observer, inject } from 'mobx-react'
import { Button } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar, Typography } from '@material-ui/core'
import { useStyles } from "../styles/style";
import { Link } from 'react-router-dom'

const CreatorHeader = inject('userStore')(observer((props) => {
  const { userStore, creatorId } = props
  const { favorites, isLoggedIn } = userStore
  const classes = useStyles();


  let isFavorite = favorites.some(f => creatorId === f._id)
  const [open, setOpen] = React.useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClick = () => {
    if (isLoggedIn && isFavorite) userStore.deleteFavorite(creatorId)
    if (isLoggedIn && !isFavorite) userStore.saveFavorite(creatorId)
    else { setOpen(true) }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return }
    setOpen(false);
  }

  return (
    <>
      {isFavorite
        ? <Button style={{marginLeft: 20}} size='small' variant='outlined' color='secondary' onClick={handleClick}>
          <Typography className={classes.typography}>
            Unfavorite
          </Typography>
        </Button>
        : <Button size='small' style={{marginLeft: 20}} className={classes.typographyTwo} variant='contained' color='secondary' onClick={handleClick}>
          Favorite</Button>
      }
      {!isLoggedIn &&
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            <Typography>
              <Link to='/auth/login' style={{ textDecoration: 'none', color: 'white' }}>Please login</Link>
            </Typography>
          </Alert>
        </Snackbar>
      }
    </>
  )
})
)

export default CreatorHeader