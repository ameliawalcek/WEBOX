import { observable, action } from 'mobx'
import axios from 'axios'

export class MediaStore {
    @observable trending = []
    @observable searchResults = []

    @action async getTrending(category) {
        let trending = await axios.get(`http://localhost:3001/media/trending?category=${category}`)
        this.trending = trending.data
    }

    @action searchCreators(value) {
        this.creators.length
            ? this.searchResults = this.creators.filter(c => c.twitch.toLowerCase().includes(value))
            : this.searchResults = this.trending.filter(c => c.twitch.toLowerCase().includes(value))
    }
}