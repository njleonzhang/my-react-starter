import { observable, action } from 'mobx'

export default class AuthState {
  @observable authCode

  constructor() {
    this.authCode = ''
  }

  @action setAuthCode(authCode) {
    this.authCode = authCode
  }
}
