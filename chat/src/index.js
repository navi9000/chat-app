import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store'
import { Provider } from 'react-redux'

import firebase from 'firebase/compat/app'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const reactReduxFirebaseProps = {
  firebase,
  config: {},
  dispatch: store.dispatch
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
