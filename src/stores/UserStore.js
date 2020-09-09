import { observable, action, computed } from "mobx";
import axios from "axios";
import io from "socket.io-client";
import { parseCookie, setCookie } from "../utils/utils";

export class UserStore {
  @observable userId = ""
  @observable isLoggedIn = false
  @observable favorites = []
  @observable notifications = []
  @observable darkState = JSON.parse(localStorage.dark || "false")

  socket = io('http://localhost:3001')

  connectUserSocket = () => {
    this.socket.emit('online', this.userId)
    this.socket.on('newNotification', (notification) => {
      console.log(notification)
      this.notifications = [...this.notifications, notification]
    })
  }

  disconnectUserSocket = () => {
    this.socket.emit('disconnect', this.userId)
  }

  @action handleDarkStateChange = () => {
    this.darkState = !this.darkState
    localStorage.setItem("dark", this.darkState)
  };

  @action cookieLogIn = () => {
    const cookie = parseCookie()
    if (cookie) {
      return axios
        .post(`http://localhost:3001/auth/cookie`, { cookie })
        .then((d) => {
          this.userId = cookie
          this.isLoggedIn = true
          this.getUser(this.userId)
          return d
        })
        .catch((e) => e.response.data)
    }
    return false;
  };

  @action async getUser(id) {
    let user = await axios.get(`http://localhost:3001/user/${id}`)
    this.favorites = user.data.favorites
    this.notifications = user.data.notifications
  }

  @action checkUser = async (user) => {
    return await axios.post("http://localhost:3001/auth/login", user)
      .then(d => {
        this.userId = d.data.userId
        this.isLoggedIn = true
        setCookie(this.userId)
        this.getUser(this.userId)
      }).catch(e => e.response.data)
  }

  @action saveUser = async (user) => {
    return await axios.post("http://localhost:3001/auth/signup", user)
      .then(d => {
        this.userId = d._id
        this.isLoggedIn = true
        return d
      }).catch(e => e.response.data)
  }

  @action async saveFavorite(id) {
    await axios.post(`http://localhost:3001/user/favorites`, {
      creatorId: id,
      userId: this.userId,
    })
    this.getUser(this.userId)
  }

  @action async deleteFavorite(id) {
    await axios({
      url: `http://localhost:3001/user/favorites`,
      method: "DELETE",
      data: { creatorId: id, userId: this.userId },
    }).then(res => {
      this.favorites = this.favorites.filter((favorite) => favorite._id !== id)
    })
  }

  @action async deleteNotification(notificationId, userId) {
    await axios({
      url: `http://localhost:3001/user/notifications`,
      method: "DELETE",
      data: { notificationId: notificationId, userId: userId },
    }).then(res => {
      this.notifications = this.notifications.filter(notification => notification._id !== notificationId)
    })
  }

  @computed get notificationLength() {
    return this.notifications.length
  }
}
