import React from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Avatar, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core'

import { useStyles } from "../styles/style";

const CreatorHeader = inject('creatorStore', 'userStore')(observer((props) => {
  const { creator } = props.creatorStore
  const { userStore } = props
  const { favorites, isLoggedIn } = userStore

  const classes = useStyles()
  let isFavorite = favorites.some(f => creator._id === f._id)
  const [open, setOpen] = React.useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClick = () => {
    if (isLoggedIn && isFavorite) userStore.deleteFavorite(creator._id)
    if (isLoggedIn && !isFavorite) userStore.saveFavorite(creator._id)
    else { setOpen(true) }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') { return }
    setOpen(false);
  }

  return (
    <>
      <MenuItem>
        <div className={classes.rootCreatorTwo}>
          <Avatar
            alt={creator.twitchName}
            src={creator.imgUrl}
            className={classes.largeCreatorTwo}
          />
        </div>
      </MenuItem>
      {isFavorite
        ? <Button size='small' variant='outlined' color='secondary' onClick={handleClick}>
          Unfavorite </Button>
        : <Button size='small' variant='contained' color='secondary' onClick={handleClick}>
          Favorite</Button>
      }
      {!isLoggedIn &&
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info">
            Please login</Alert>
        </Snackbar>
      }
    </>
  )
})
)

export default CreatorHeader