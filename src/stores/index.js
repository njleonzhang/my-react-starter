import { store } from 'rfx-core'

import AppState from './AppState'
import MgmtState from './MgmtState'

export default store.setup({
	appState: AppState,
  mgmtState: MgmtState
})
