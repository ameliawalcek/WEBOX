import { observable, action } from 'mobx'
import axios from 'axios'

export class MediaStore {
    @observable loading = true
    @observable trending = []
    @observable searchResults = []
    @observable category = 'All'
    @observable pageNum = 1
    @observable hasMore = false

    @action resetTrending = () => { this.trending = [] }

    @action setCategory = (category) => { this.category = category; this.pageNum = 1 }

    @action setLoading = (bool) => { this.loading = bool }

    @action setHasMore = (bool) => { this.hasMore = bool }

    @action getNextPage = () => { this.pageNum++ }

    @action getTrending = async (category, pageNum) => {
        let res = await axios.get(`http://localhost:3001/media/trending?category=${category}&page=${pageNum}`)
        this.trending = [...new Set([...this.trending, ...res.data.creators].map(JSON.stringify))].map(JSON.parse)
        this.setHasMore(res.data.creators.length > 0)
    }

    @action searchCreators(value) {
        this.searchResults = this.trending.filter(c => c.twitch.toLowerCase().includes(value))
    }
}