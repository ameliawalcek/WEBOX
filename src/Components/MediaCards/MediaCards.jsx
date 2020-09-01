import React from 'react'
import Header from '../Header/Header'
import MediaCard from './MediaCard'
import GridList from '@material-ui/core/GridList';
import { inject, observer } from 'mobx-react'
import { useLocation } from 'react-router-dom'
import { isWidthUp } from '@material-ui/core/withWidth';

const MediaCards = inject('userStore', 'mediaStore')(observer((props) => {
    const location = useLocation()
    
    const getGridListCols = () => {
        if (isWidthUp('xl', props.width)) return 4;
        if (isWidthUp('lg', props.width)) return 3;
        if (isWidthUp('md', props.width)) return 2;
        else return 1;
    }

    return (
        <div>
            {location.pathname === '/dashboard' ? <Header page={'basic'} /> : <Header page={'explore'} />}
            <GridList spacing={15} cellHeight={400} cols={getGridListCols()}>
                {/* {props.userStore.favorites.map(favorite => {
                    return <MediaCard id={favorite._id} img={favorite.img} creator={favorite.creator} />
                })} */}

                <MediaCard />
                <MediaCard />
                <MediaCard />
                <MediaCard />
            </GridList>
        </div>
    )
}))

export default MediaCards