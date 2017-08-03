import { inject, observer } from 'mobx-react'

@inject('store')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.appState
  }

  render() {
    return <div>
        Home {this.store.dateStr}
      </div>
  }
}
