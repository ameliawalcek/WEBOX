import { observable, action } from 'mobx'
import axios from 'axios'

export class MediaStore {
    @observable loading = false
    @observable trending = []
    @observable searchInput = ''

    @action async getTrending(category) {
        this.loading = true
        let trending = await axios.get(`http://localhost:3001/media/trending?category=${category}`)
        this.trending = trending.data
        setTimeout(() => {
            this.loading = false
        }, 1500)
    }
}