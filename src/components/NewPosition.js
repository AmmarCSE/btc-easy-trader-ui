import React, { Component, PropTypes } from 'react'
import {generateReactKey} from '../utils'

class NewPosition extends Component {
  render() {
    let { exchanges } = this.props
    exchanges = exchanges || {} 
    return (
      <form>
          <select name="exchange">
                <option value="wechat" key={generateReactKey()}></option>
            {
              Object.keys(exchanges).map(exchange =>
                <option value={exchange} key={generateReactKey()}>{exchange}</option>
              )
            }
          </select>
          <select name="market">
          </select>
          <select name="currency">
          </select>
      </form>
    )
  }
}

export default NewPosition
