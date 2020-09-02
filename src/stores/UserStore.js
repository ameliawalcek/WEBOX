import { observable, action } from "mobx";
import axios from "axios";

export class UserStore {
  @observable userId = "";
  @observable favorites = [];
  @observable isLoggedIn = false;
  @observable notifications = [];


  @action async getUser(id) {
    // let data = await axios.get(`ADDRESS/user/${id}`);
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
    let favorite = await axios.post(`ADDRESS/user/favorites/${id}`);
    this.favorites.push(/*update state with favorite*/);
  }

  @action async deleteFavorite(id) {
    let deletedFavorite = await axios.delete(`ADDRESS/user/favorites/${id}`);
    this.favorites.find(/*delete favorite from state*/);
  }

  @action async deleteNotification(id) {
    let deletedNotification = await axios.delete(`ADDRESS/user/notifications/${id}`);
  }
}
