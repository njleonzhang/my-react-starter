import { inject, observer } from 'mobx-react'

@inject('appState')
@observer
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.appState
  }

  componentDidMount() {
    this.store.setDate(new Date('2002-1-1'))
    console.log(this.props.location.pathname)
  }

  render() {
    return (<div>
        Test {this.store.dateStr}
    </div>)
  }
}
