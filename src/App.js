import React, { Component } from 'react'
import { connect } from 'react-redux'
import Positions from '../src/positions/containers/Positions'
import { fetchPositions } from '../src/positions/actions'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPositions())
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
