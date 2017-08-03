import { observable, action, computed } from "mobx";
import moment from 'moment'

export default class AppState {
  @observable date

  constructor() {
    this.date = new Date()
  }

  @computed get dateStr() {
    return moment(this.date).format('YYYY-MM-DD')
  }

  @action setDate(date) {
    this.date = date
  }
}
