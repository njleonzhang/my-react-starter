import { observable, action, computed } from "mobx";

export default class AppState {
  @observable date

  constructor() {
    this.date = new Date()
  }

  @computed get dateStr() {
    return `${this.date.getFullYear()}/${this.date.getMonth()}/${this.date.getDate()}`
  }

  @action setDate(date) {
    this.date = date
  }
}
