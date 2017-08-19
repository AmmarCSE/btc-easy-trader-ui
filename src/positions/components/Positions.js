import React, { Component, PropTypes } from 'react'
//import {TRANSACTION_TYPES} from '../resources/enums'
import {generateReactKey} from '../../utils'

class Positions extends Component {
  render() {
    let { positions } = this.props
    positions = positions || []
    return (
      <div id="PositionsView">
        <h2>
          Positions
        </h2>
        <table>
          <thead>
            <th>
              Exchange
            </th>
            <th>
              Currency
            </th>
            <th>
              Amount 
            </th>
            <th>
              Price
            </th>
            <th>
              % Change
            </th>
            <th>
              Date
            </th>
          </thead>
          <tbody>
              {
                positions.map(position =>
                  <tr>
                    <td key={generateReactKey()}>
                      {position.exchange}
                    </td>
                    <td key={generateReactKey()}>
                      {position.currency}
                    </td>
                    <td key={generateReactKey()}>
                      {position.amount}
                    </td>
                    <td key={generateReactKey()}>
                      {position.price}
                    </td>
                    <td key={generateReactKey()}>
                      {position.percentChange}
                    </td>
                    <td key={generateReactKey()}>
                      {new Date(position.purchaseDate).toISOString()}
                    </td>
                  </tr>
                )
              }
          </tbody>
        </table>
        <button>New position</button>
      </div>
    )
  }
}

export default Positions 
