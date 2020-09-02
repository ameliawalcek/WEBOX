import { observable, action, computed } from 'mobx'
import axios from 'axios'

export class MediaStore {
    @observable creators = []
    @observable trending = []
    @observable searchResults = []

    @action async getTrending(category) {
        let trending = await axios.get('/') // 
        this.trending = trending
    }

    @action async getCreators() {
        let creatorsFromDb = await axios.get('/') // 
        this.creators = creatorsFromDb
    }

    @action searchCreators(value) {
        this.searchResults = this.creators.filter(c => c.twitch.toLowerCase().includes(value));
    }
}
