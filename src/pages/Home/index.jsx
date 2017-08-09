import { inject, observer } from 'mobx-react'
import './home.scss'
import {post} from '@services/Http'

@inject('store')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.appState
  }

  componentDidMount() {
    this.store.setDate(new Date('2017-1-2'))
  }

  login = () => {
    post('user/login/', {
      cellphone: '100001',
      password: '6666666'
    }).then(data => {
      console.log('ok', data)
    }, error => {
      console.log('error', error)
    })
  }

  render() {
    return <div>
        Home {this.store.dateStr}

        <button onClick={this.login}>testHttp111</button>
      </div>
  }
}
