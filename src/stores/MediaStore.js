import { observable, action } from 'mobx'
import axios from 'axios'

export class MediaStore {
    @observable loading = false
    @observable trending = []
    @observable searchResults = []

    @action async getTrending(category) {
        this.loading = true
        let trending = await axios.get(`http://localhost:3001/media/trending?category=${category}`)
        this.trending = trending.data
        setTimeout(() => {
            this.loading = false
        }, 1500)
    }

    @action searchCreators(value) {
        this.loading = true
        this.creators.length
            ? this.searchResults = this.creators.filter(c => c.twitch.toLowerCase().includes(value))
            : this.searchResults = this.trending.filter(c => c.twitch.toLowerCase().includes(value))
        this.loading = false
    }
}