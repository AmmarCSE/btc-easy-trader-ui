import React, { Component, PropTypes } from 'react'
import {generateReactKey} from '../utils'
import {TRANSACTION_TYPES} from '../resources/enums'

class UpsertTransaction extends Component {
  static propTypes = {
  }

  render() {
    return (
      <form>
          <select name="type">
              {Object.keys(TRANSACTION_TYPES).map(transactionTypeKey =>
                <option value={TRANSACTION_TYPES[transactionTypeKey].code}>{TRANSACTION_TYPES[transactionTypeKey].display}</option>
              )}
          </select>
      </form>
    )
  }
}

export default UpsertTransaction
