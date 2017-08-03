import './index.css'
import img from '@images/logo.svg'
import Home from '@pages/Home'
import { inject, observer } from 'mobx-react'
import { Link, Route, withRouter } from "react-router-dom";

@withRouter
@inject('store')
@observer
export default class App extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.appState
    console.log(this.store)
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
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to={'/home'}>
          go to home
        </Link>
        <div className='main-area'>
          <Route path='/home' component={Home}/>
          {/* <Route path='/my' component={My}/> */}
        </div>
      </div>
    );
  }
}
