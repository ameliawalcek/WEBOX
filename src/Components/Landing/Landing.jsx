import React from 'react';
import { observer, inject } from 'mobx-react'

const Landing = inject('userStore', 'mediaStore')(observer((props) => {

    return (
        <div>

        </div>
    )
}))

export default Landing;