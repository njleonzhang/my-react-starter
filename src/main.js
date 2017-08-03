import ReactDOM from 'react-dom'
import '@styles/index.css'
import App from '@components/App'
import { Router } from "react-router-dom"
import { Link } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { rehydrate, hotRehydrate } from "rfx-core"
import { isProduction } from "./utils/constants"
import { Provider } from "mobx-react"
import stores from "./stores"
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const store = rehydrate()

const renderApp = Component => {
  const browserHistory = createBrowserHistory()
  const routerStore = new RouterStore()
  const history = syncHistoryWithStore(browserHistory, routerStore)

  ReactDOM.render(
    <AppContainer>
      <Provider store={isProduction ? store : hotRehydrate()} routing={routerStore}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}

renderApp()

// hot reload config
if (module.hot) {
	module.hot.accept(() => renderApp(App));
}
