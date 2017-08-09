import React from 'react'
import { shallow } from 'enzyme'
import Ledger from './Ledger'
import {TRANSACTION_TYPES} from '../resources/enums'

function setup(balance, transactions) {
  const component = shallow(
    <Ledger balance={balance} transactions={transactions} />
  )

  return {
    component: component
  }
}

describe('Ledger component', () => {
  it('should exist', () => {
    expect(Ledger).toBeTruthy()
  })
  describe('Balance', () => {
    it('should display balance', () => {
      const { component } = setup()
      expect(component.text()).toMatch(/^Balance:/)
    })
    it('should display balance as number', () => {
      const { component } = setup(1000)
      expect(component.text()).toMatch(/^Balance: 1000/)
    })
    it('should display balance as zero when none is provided', () => {
      const { component } = setup()
      expect(component.text()).toMatch(/^Balance: 0/)
    })
  })
  describe('Transactions', () => {
    it('should display transaction if there is one', () => {
      let date = new Date().getTime()
      const transaction = {
        type: TRANSACTION_TYPES.income.code,
        amount: 100,
        date 
      }
      const { component } = setup(null, [transaction])
      expect(component.text()).toMatch(/Type: Income/)
      expect(component.text()).toMatch(/Amount: 100/)
      expect(component.text()).toMatch(/Date: \d{4}-\d{2}-\d{2}/)
    })
    it('should display all transactions', () => {
      const transactions = [
        {
          type: TRANSACTION_TYPES.income.code,
          amount: 100,
          date: new Date('2015-09-18').getTime() 
        },
        {
          type: TRANSACTION_TYPES.injection.code,
          amount: 50,
          date: new Date('2016-02-09').getTime() 
        },
        {
          type: TRANSACTION_TYPES.income.code,
          amount: 63,
          date: new Date('2017-11-28').getTime() 
        }
      ]

      const { component } = setup(null, transactions)
      expect(component.text()).toMatch(/(.|\n)*Type: Income(.|\n)*Amount: 100(.|\n)*Date: 2015-09-18(.|\n)*Type: Injection(.|\n)*Amount: 50(.|\n)*Date: 2016-02-09(.|\n)*Type: Income(.|\n)*Amount: 63(.|\n)*Date: 2017-11-28/)
    })
    it('should display no transactions when there are none', () => {
      const { component } = setup()
      expect(component.text()).not.toMatch(/(.|\n)*Type: (.|\n)*Amount: (.|\n)*Date: \d{4}-\d{2}-\d{2}/)
    })
  })
  describe('Adding a transaction', () => {
    it('Add transaction button should exist', () => {
      const { component } = setup()
      const matchedButtons = component.find('button').filterWhere(n => n.text() == 'Add transaction');
      expect(matchedButtons.length).toEqual(1);
    })
  })
})
