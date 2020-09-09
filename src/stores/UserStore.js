import { observable, action, computed } from "mobx";
import axios from "axios";
import { parseCookie, setCookie } from "../utils/utils";

export class UserStore {
    @observable userId = "";
    @observable isLoggedIn = false
    @observable favorites = [];
    @observable notifications = [];
    @observable darkState = JSON.parse(localStorage.dark || 'false')

    @action handleDarkStateChange = () => {
        this.darkState = !this.darkState
        localStorage.setItem('dark', this.darkState)
    }

    @action cookieLogIn = () => {
        const cookie = parseCookie()
        if (cookie) {
            return axios.post(`http://localhost:3001/auth/cookie`, { cookie })
                .then(d => {
                    this.isLoggedIn = true
                    this.userId = cookie
                    this.getUser(this.userId)
                    return d
                }).catch(e => e.response.data)
        }
        return false
    }

    @action async getUser(id) {
        console.log(id)
        let user = await axios.get(`http://localhost:3001/user/${id}`);
        this.favorites = user.data.favorites
        this.notifications = user.data.notifications
    }

    @action checkUser = async (user) => {
        return await axios.post("http://localhost:3001/auth/login", user)
            .then(d => {
                this.isLoggedIn = true
                this.userId = d.data.userId
                setCookie(this.userId)
                this.getUser(this.userId)
            }).catch(e => e.response.data)
        }
        
        @action saveUser = async (user) => {
            return await axios.post("http://localhost:3001/auth/signup", user)
            .then(d => {
                this.isLoggedIn = true
                this.userId = d._id
                return d
            }).catch(e => e.response.data)
    }

    @action async saveFavorite(id) {
        await axios.post(`http://localhost:3001/user/favorites`, { creatorId: id, userId: this.userId });
        this.getUser(this.userId)
    }

    @action async deleteFavorite(id) {
        await axios({ url: `http://localhost:3001/user/favorites`, method: 'DELETE', data: { creatorId: id, userId: this.userId } })
        this.favorites = this.favorites.filter(favorite => favorite._id !== id)
    }

    @action async deleteNotification(id) {
        await axios.delete(`http://localhost:3001/user/notifications/${id}`)
        this.notification = this.notifications.filter(notification => notification.id !== id)
    }

    @computed get notificationLength(){
        return this.notifications.length
    } 
}
