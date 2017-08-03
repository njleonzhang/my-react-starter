import { inject, observer } from 'mobx-react'

@inject('store')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.appState
  }

  componentDidMount() {
    this.store.setDate(new Date('2002-1-1'))
  }

  render() {
    return <div>
        Test {this.store.dateStr}
      </div>
  }
}
