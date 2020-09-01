import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('userStore', 'mediaStore')
@observer
class MediaCards extends Component {
    constructor() {
        super()
        this.state = {
            input: ''
        }
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default MediaCards