import { observable, action, computed } from 'mobx'

class AppState {
  @observable date
  @observable testVal

  constructor() {
    this.date = new Date()
    this.testVal = '1234'
  }

  @computed get dateStr() {
    return `${this.date.getFullYear()}/${this.date.getMonth()}/${this.date.getDate()}`
  }

  @action setDate(date) {
    this.date = date
  }
}

export default new AppState()
