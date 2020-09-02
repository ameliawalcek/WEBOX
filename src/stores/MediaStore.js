import { observable, action, computed } from 'mobx'
import axios from 'axios'

export class MediaStore {
    @observable creators = []
    @observable trending = []

    @action async getTrending(){
        let trending = await axios.get()
        this.trending = trending
    }
}
