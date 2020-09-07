import { observable, action } from 'mobx'
import axios from 'axios'

export class MediaStore {
    @observable loading = true
    @observable trending = []
    @observable searchInput = ''
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
        const res = await axios.get(`/media/trending?category=${category}&page=${pageNum}`)
        this.trending = [...this.trending, ...res.data.creators]
        this.setHasMore(res.data.creators.length > 0)
    }
}