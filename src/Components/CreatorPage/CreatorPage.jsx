import React from 'react';
import { observer, inject } from 'mobx-react'

const CreatorPage = inject('userStore', 'mediaStore')(observer((props) => {

    return (
        <div>
        <Header page={'creator'}/>

        </div>
    )
}))

export default CreatorPage;