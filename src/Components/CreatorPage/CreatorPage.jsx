import React from 'react';
import { observer, inject } from 'mobx-react'

const CreatorPage = inject('userStore', 'mediaStore')(observer((props) => {

    return (
        <div>

        </div>
    )
}))

export default CreatorPage;