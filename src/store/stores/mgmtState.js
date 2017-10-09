import { observable, action } from 'mobx'

class AuthState {
  @observable authCode

  constructor() {
    this.authCode = ''
  }

  @action setAuthCode(authCode) {
    this.authCode = authCode
  }
}

export default new AuthState()
