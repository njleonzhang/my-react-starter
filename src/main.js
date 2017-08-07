import ReactDOM from 'react-dom'
import '@styles/index.css'
import App from '@components/App'
import { Router } from "react-router-dom"
import { Link } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { isProduction } from "./utils/constants"
import { Provider } from "mobx-react"
import stores from "./stores"
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)

const renderApp = (Component, store) => {
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

renderApp(App, stores)

// hot reload config
if (module.hot) {
  // module.hot.accept('./stores', () => {
  //   let store = require('./stores').default
  //   console.log(store)
  // })

  module.hot.accept('./components/App', () => {
    let NewApp = require('./components/App').default
    renderApp(NewApp, stores)
  })
}
