import { inject, observer } from 'mobx-react'
import './login.scss'

@inject('store')
@observer
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.appState
  }

  render() {
    return <div>login</div>
  }
}
