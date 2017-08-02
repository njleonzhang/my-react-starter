import ReactDOM from 'react-dom'
import '@styles/index.css'
import App from '@components/App'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from "react-router-dom"
import { Link } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

ReactDOM.render(
  <AppContainer>
    <Router>
      <App />
    </Router>
  </AppContainer>,
  document.getElementById('app'))

registerServiceWorker()

// hot reload config
if (module.hot) {
	module.hot.accept(() => renderApp(App));
}
