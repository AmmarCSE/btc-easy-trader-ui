import React, { Component } from 'react'
import { connect } from 'react-redux'
import Positions from '../src/positions/components/Positions'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div>
            <Positions />
        </div>
    )
  }
}

export default connect()(App)
