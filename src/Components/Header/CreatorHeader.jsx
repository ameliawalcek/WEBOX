import React from 'react'
import { observer, inject } from 'mobx-react'
import { makeStyles, Button, Avatar, MenuItem } from '@material-ui/core'
 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))
 
const CreatorHeader = inject('creatorStore', 'userStore')(observer((props) => {
  const { creator } = props.creatorStore
  const { favorites } = props.userStore
  const classes = useStyles()
  let isFavorite = favorites.some(f => creator._id === f._id)
 
  return (
    <>
      <MenuItem>
        <div className={classes.root}>
          <Avatar
            alt={creator.twitchName}
            src={creator.imgUrl}
            className={classes.large}
          />
        </div>
      </MenuItem>
      {isFavorite
        ? <Button size='small' variant='outlined' color='default'>
          Unfavorite</Button>
        : <Button size='small' variant='contained' color='default'>
          Favorite</Button>
      }
    </>
  )
})
)
 
export default CreatorHeader