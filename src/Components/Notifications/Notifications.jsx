import React from 'react';
import { observer, inject } from 'mobx-react'
import Header from '../Header/Header'

const Notifications = inject('userStore', 'mediaStore')(observer((props) => {

    return (
        <div>
            <Header page={'basic'} />

        </div>
    )
}))

export default Notifications;