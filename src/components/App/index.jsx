import img from '@images/logo.svg'
import Home from '@pages/Home'
import Test from '@pages/Test'
import { inject, observer } from 'mobx-react'
import { Link, Route, withRouter } from 'react-router-dom'

import '@stores' // for hot-reload, make code change in store trigger App.jsx reload
import './index.css'

@withRouter
@inject('appState', 'routerStore')
@observer
export default class App extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.appState
  }

  componentDidMount() {
    this.store.setDate(new Date('2017-11-11'))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={img} className="App-logo" alt="logo" />
          <h2>Welcome to React {this.store.dateStr}</h2>
          <h3>{this.props.routerStore.location.pathname}</h3>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. {this.store.testVal}
        </p>
        <Link to={'/home'} className="home-link">
          go to home
        </Link>
        <Link to={'/test'} className="test-link">
          go to test
        </Link>
        <div className="main-area">
          <Route path="/home" component={Home} />
          <Route path="/test" component={Test} />
        </div>
      </div>
    )
  }
}
