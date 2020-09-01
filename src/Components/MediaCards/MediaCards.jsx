import React from 'react'
import { inject, observer } from 'mobx-react'
import Header from '../Header/Header'
import { useLocation } from 'react-router-dom'

const MediaCards = inject('userStore', 'mediaStore')(observer((props) => {

    const location = useLocation()

    return (
        <div>
            {location.pathname === '/dashboard' ? <Header page={'basic'} /> : <Header page={'explore'} />}

        </div>
    )
}))

export default MediaCards