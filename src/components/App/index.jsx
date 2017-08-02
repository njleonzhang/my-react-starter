import './index.css'
import img from '@images/logo.svg'
import Home from '@pages/Home'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={img} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
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
