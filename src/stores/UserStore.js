import { observable, action, computed } from "mobx";
import axios from "axios";

export class UserStore {
  @observable userId = "";
  @observable favorites = [];
  @observable isLoggedIn = false;
  @observable notifications = [];


  @action async getUser(id) {
    let data = await axios.get(`ADDRESS/user/${id}`);
  }

  @action async checkUser(user) {
    const result = await axios.post("/login", user);
    if (result.status === 202) {
        this.isLoggedIn = true
        this.userId = result._id
        this.getUser(this.userId)
    }
    return result.message;
  }

  @action async saveUser(user) {
    const result = await axios.post("/signup", user);
    if (result.status === 201) {
        this.isLoggedIn = true
        this.userId = result._id
    }
    return result.message;
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
