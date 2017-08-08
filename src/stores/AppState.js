import { observable, action, computed } from "mobx";

export default class AppState {
  @observable date
  @observable testVal

  constructor() {
    this.date = new Date()
    this.testVal = '123'
  }

  @computed get dateStr() {
    return `${this.date.getFullYear()}/${this.date.getMonth()}/${this.date.getDate()}`
  }

  @action setDate(date) {
    this.date = date
  }
}
