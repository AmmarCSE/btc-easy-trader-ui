import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App'
import { configureStore } from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById('root')
)
