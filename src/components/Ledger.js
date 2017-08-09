import React, { Component, PropTypes } from 'react'
import {TRANSACTION_TYPES} from '../resources/enums'
import {generateReactKey} from '../utils'

class Ledger extends Component {
  static propTypes = {
    balance: PropTypes.number,
    transactions: PropTypes.array
  }

  render() {
    let { balance, transactions } = this.props
    balance = balance || 0
    transactions = transactions || []
    return (
      <div>
        <div>
          Balance: {balance}
        </div>
        <div>
          <button>Add transaction</button>
        </div>
        <div>
          {transactions.map(transaction =>
            <div key={generateReactKey()}>
              Type: {TRANSACTION_TYPES[transaction.type].display}
              Amount: {transaction.amount}
              Date: {new Date(transaction.date).toISOString()}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Ledger
