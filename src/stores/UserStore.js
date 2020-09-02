import { observable, action, computed } from 'mobx'
import axios from 'axios'

export class UserStore {
    @observable favorites = []
    @observable isLoggedIn = false
    @observable notifications = []

    @action async getUser(id) {
        let data = await axios.get(`ADDRESS/user/${id}`)
        //update state with user favorites and notifications
    }

    //get favorites (do we need?)

    @action async saveFavorite(id) {
        let favorite = await axios.post(`ADDRESS/user/favorites/${id}`)
        this.favorites.push(/*update state with favorite*/)
    }

    @action async deleteFavorite(id) {
        let deletedFavorite = await axios.delete(`ADDRESS/user/favorites/${id}`)
        this.favorites.find(/*delete favorite from state*/)
    }

    //get notifications (do we need?)

    @action async deleteNotification(id) {
        let deletedNotification = await axios.delete(`ADDRESS/user/notifications/${id}`)
    }

}
