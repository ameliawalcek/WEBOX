import { observable, action } from 'mobx'
import axios from 'axios'

export class CreatorStore {
  @observable creator = {}
  @observable loading = true
  @observable creatorTOAdd = {}

  @action async getCreatorById(id) {
    this.creator = (await axios('http://localhost:3001/media/channel/' + id)).data
    this.loading = false
  };

  @action cleanCreatorData = () => { this.creator = {} }
}
