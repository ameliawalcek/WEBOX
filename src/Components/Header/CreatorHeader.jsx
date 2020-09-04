import React from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Avatar, MenuItem } from '@material-ui/core'
import { useStyles } from "../styles/style";

const CreatorHeader = inject('creatorStore', 'userStore')(observer((props) => {
  const { creator } = props.creatorStore
  const { favorites } = props.userStore
  const classes = useStyles()
  let isFavorite = favorites.some(f => creator._id === f._id)

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
        ? <Button size='small' variant='outlined' color='secondary'>
          Unfavorite </Button>
        : <Button size='small' variant='contained' color='secondary'>
          Favorite</Button>
      }
    </>
  )
})
)

export default CreatorHeader