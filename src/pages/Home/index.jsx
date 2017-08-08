import { inject, observer } from 'mobx-react'

@inject('store', 'routing')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.appState
  }

  componentDidMount() {
    this.store.setDate(new Date('2019-11-9'))
    console.log(this.props.routing.location.pathname)
  }

  render() {
    return <div>
        Home {this.store.dateStr}
        <div>{this.store.testVal}</div>
      </div>
  }
}
