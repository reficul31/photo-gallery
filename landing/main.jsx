import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import configureStore from './store'
import { Provider } from 'react-redux'

import Layout from './layout'
import Routes from './routes'

let ReduxDevTools
if (process.env.NODE_ENV !== 'production') {
	ReduxDevTools = require('../dev/redux-devtools-component').default
}

// Set up the Redux store
const store = configureStore({ReduxDevTools})

// Render the UI to the screen

ReactDOM.render(
	<Provider store={store}>
		<div>
			<Router history={browserHistory}>
				<Route path='/layout' component={Layout}>
					<IndexRedirect to='/landing' />
					{ Routes.map(route =>
						<Route
							key={route.pathname}
							path={route.pathname}
							component={route.component}
						/>
					)}
				</Route>
			</Router>
			{ReduxDevTools && <ReduxDevTools />}
		</div>
	</Provider>,
	document.getElementById('app')
)
