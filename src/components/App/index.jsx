import './index.css'
import img from '@images/logo.svg'
import Home from '@pages/Home'
import Test from '@pages/Test'
import { inject, observer } from 'mobx-react'
import { Link, Route, withRouter } from "react-router-dom";

@withRouter
@inject('store', 'routing')
@observer
export default class App extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.appState
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
          <h3>{this.props.routing.location.pathname}</h3>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to={'/home'} className='home-link'>
          go to home
        </Link>
        <Link to={'/test'} className='test-link'>
          go to test
        </Link>
        <div className='main-area'>
          <Route path='/home' component={Home}/>
          <Route path='/test' component={Test}/>
        </div>
      </div>
    );
  }
}