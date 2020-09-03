import { observable, action } from "mobx";
import axios from "axios";

export class UserStore {
    @observable userId = "";
    @observable isLoggedIn = false;
    @observable favorites = [];
    @observable notifications = [];
    @observable darkState = JSON.parse(localStorage.dark || 'false')

    @action handleDarkStateChange = () => {
        this.darkState = !this.darkState
        localStorage.setItem('dark', this.darkState)
    }

    @action async getUser(id) {
        let user = await axios.get(`http://localhost:3001/user/${id}`);
        this.favorites = user.data.favorites
        this.notifications = user.data.notifications
    }

    @action async checkUser(user) {
        return await axios.post("http://localhost:3001/auth/login", user)
            .then(d => {
                this.isLoggedIn = true
                this.userId = d._id
                this.getUser(this.userId)
            }).catch(e => e.response.data)
    }

    @action async saveUser(user) {
        return axios.post("http://localhost:3001/auth/signup", user)
            .then(d => {
                this.isLoggedIn = true
                this.userId = d._id
            }).catch(e => e.response.data)
    }

    @action async saveFavorite(id) {
        let favorite = await axios.post(`http://localhost:3001/user/favorites/${id}`);
        this.favorites.push(favorite.data);
    }

    @action async deleteFavorite(id) {
        await axios.delete(`http://localhost:3001/user/favorites/${id}`)
        this.favorites = this.favorites.filter(favorite => favorite.id !== id);
    }

    @action async deleteNotification(id) {
        await axios.delete(`http://localhost:3001/user/notifications/${id}`)
        this.notification = this.notifications.filter(notification => notification.id !== id)
    }
}
