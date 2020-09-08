import { observable, action } from 'mobx'
import axios from 'axios'

export class MediaStore {
    @observable loading = true
    @observable trending = []
    @observable results = true
    @observable searchInput = ''
    @observable pageNum = 1
    @observable searchResults = []
    @observable category = 'All'
    @observable hasMore = false

    @action resetTrending = () => { this.trending = [] }

    @action setCategory = (category) => { this.category = category; this.pageNum = 1 }

    @action setLoading = (bool) => { this.loading = bool }

    @action setResults = (bool) => { this.results = bool }

    @action setInput = () => { this.searchInput = '' }

    @action setHasMore = (bool) => { this.hasMore = bool }

    @action getNextPage = () => { this.pageNum++ }

    @action handleSearch = (searchInput) => { this.searchInput = searchInput; this.pageNum = 1 }

    @action getTrending = async (category, pageNum, input) => {
        this.setLoading(true)
        this.setResults(true)
        let cancel
        axios({
            method: 'GET',
            url: `http://localhost:3001/media/trending?category=${category}&page=${pageNum}&input=${input}`,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            this.trending =
                [...new Set([...this.trending, ...res.data.creators]
                    .map(JSON.stringify))].map(JSON.parse)
            if (!this.trending.length) { this.setResults(false) }
            this.setHasMore(res.data.creators.length > 0)
            this.setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
        })
        return () => cancel
    }

    @action findCreator = async (creator) => {
        await axios.post(`http://localhost:3001/media/addCreator`, creator);
    }
}