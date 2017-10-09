import { inject, observer } from 'mobx-react'
import './login.scss'

@inject('appState')
@observer
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.appState
  }

  render() {
    return <div>login</div>
  }
}
