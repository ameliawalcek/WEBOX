import { observable, action } from 'mobx'
import axios from 'axios'

export class MediaStore {
    @observable loading = true
    @observable trending = []
    @observable searchInput = ''
    @observable pageNum = 1
    @observable searchResults = []
    @observable category = 'All'
    @observable hasMore = false

    @action resetTrending = () => { this.trending = [] }

    @action setCategory = (category) => { this.category = category; this.pageNum = 1 }

    @action setLoading = (bool) => { this.loading = bool }

    @action setHasMore = (bool) => { this.hasMore = bool }

    @action getNextPage = () => { this.pageNum++ }

    @action handleSearch = (searchInput) => { this.searchInput = searchInput; this.pageNum = 1 }

    @action getTrending = async (category, pageNum, input) => {
        this.loading = true
        this.error = false
        let cancel
        axios({
            method: 'GET',
            url: `http://localhost:3001/media/trending?category=${category}&page=${pageNum}&input=${input}`,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            this.trending = [...this.trending, ...res.data.creators]
            this.setHasMore(res.data.creators.length > 0)
            this.loading = false
        }).catch(e => {
            if (axios.isCancel(e)) return
            this.error = true
        })
        return () => cancel()
    }
}