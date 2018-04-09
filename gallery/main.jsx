import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Redirect, Route, IndexRedirect, browserHistory } from 'react-router'
import configureStore from './store'
import { Provider } from 'react-redux'

import Layout from './layout'

import Album from './components/album'
import ViewAlbumContainer from './containers/album/viewAlbum'
import EditAlbumContainer from './containers/album/editAlbum'
import AddAlbumContainer from './containers/album/addAlbum'

import Photo from './components/photo'
import ViewPhotoContainer from './containers/photo/viewPhoto'
import AddPhotoContainer from './containers/photo/addPhoto'

import User from './components/user'
import ViewUserContainer from './containers/user/viewUser'
import EditUserContainer from './containers/user/editUser'

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
        <Redirect from='/' to='/gallery/album'/>
        <Route path='/gallery/layout' component={Layout}>
          <IndexRedirect to='/gallery/album' />
          <Route key='/gallery/album' path='/gallery/album' component={Album}>
            <IndexRedirect to='/gallery/album/view' />
            <Route key='/gallery/album/view' path='/gallery/album/view' component={ViewAlbumContainer}/>
            <Route key='/gallery/album/edit' path='/gallery/album/edit' component={EditAlbumContainer}/>
            <Route key='/gallery/album/add' path='/gallery/album/add' component={AddAlbumContainer}/>
          </Route>
          <Route key='/gallery/photo' path='/gallery/photo' component={Photo}>
            <IndexRedirect to='/gallery/photo/view' />
            <Route key='/gallery/photo/view' path='/gallery/photo/view' component={ViewPhotoContainer}/>
            <Route key='/gallery/photo/add' path='/gallery/photo/add' component={AddPhotoContainer}/>
          </Route>
          <Route key='/gallery' path='/gallery' component={User}>
            <IndexRedirect to='/gallery/user/view' />
            <Route key='/gallery/user/view' path='/gallery/user/view' component={ViewUserContainer}/>
            <Route key='/gallery/user/edit' path='/gallery/user/edit' component={EditUserContainer}/>
          </Route>
        </Route>
      </Router>
      {ReduxDevTools && <ReduxDevTools />}
    </div>
  </Provider>,
  document.getElementById('app')
)
