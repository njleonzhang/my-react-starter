import ReactDOM from 'react-dom'
import '@styles/index.css'
import App from '@components/App'
import { Router } from "react-router-dom"
import { Link } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { isProduction } from "@services/Constants"
import { Provider } from "mobx-react"
import store from "./stores"
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)

window.router = routerStore
// window.store = store

const renderApp = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} routing={routerStore}>
        <Router history={history}>
            <Component />
        </Router>
    </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

renderApp(App)

// hot reload config
if (module.hot) {
  module.hot.accept(['./components/App', './stores'], () => {
    const newApp = require('./components/App').default
    renderApp(newApp)
  })
}
