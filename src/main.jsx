import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import '@styles/main.scss'
import App from '@components/App'
import store from './stores'

const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)

window.router = routerStore

const renderApp = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} routing={routerStore}>
        <Router history={history}>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  )
}

renderApp(App)

// hot reload config
if (module.hot) {
  module.hot.accept(['./components/App', './stores'], () => {
    const newApp = import('./components/App')
    renderApp(newApp)
  })
}
