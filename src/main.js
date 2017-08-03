import ReactDOM from 'react-dom'
import '@styles/index.css'
import App from '@components/App'
import { BrowserRouter as Router } from "react-router-dom"
import { Link } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { rehydrate, hotRehydrate } from "rfx-core";
import { isProduction } from "./utils/constants";
import { Provider } from "mobx-react";
import stores from "./stores";

const store = rehydrate();
ReactDOM.render(
  <AppContainer>
    <Router>
      <Provider store={isProduction ? store : hotRehydrate()}>
        <App />
      </Provider>
    </Router>
  </AppContainer>,
  document.getElementById('app'))

// hot reload config
if (module.hot) {
	module.hot.accept(() => renderApp(App));
}
