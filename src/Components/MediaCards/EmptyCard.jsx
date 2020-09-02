import React from 'react';
import { observer, inject } from 'mobx-react'


const EmptyCard = inject('userStore', 'mediaStore')(observer((props) => {


    return (
        <div>
            {props.userStore.isLoggedIn === false
                ? <div>You are not a user please login</div> : <div>You need to add some favorites</div>}
        </div>

    )
}))

export default EmptyCard;