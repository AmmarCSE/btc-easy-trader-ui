import React from 'react'
import { shallow } from 'enzyme'
import Positions from './Positions'
//import {TRANSACTION_TYPES} from '../resources/enums'

function setup(positions) {
  const component = shallow(
    <Positions positions={positions} />
  )

  return {
    component: component
  }
}

describe('Positions component', () => {
  it('should exist', () => {
    expect(Positions).toBeTruthy()
  })
  describe('Positions View', () => {
    it('should display Positions', () => {
      const { component } = setup()
      expect(component.text()).toMatch(/^Positions/)
    })
    it('should display headers', () => {
      const { component } = setup()
      expect(component.html()).toMatch(/Exchange.+Currency.+Amount.+Price.+\% Change.+Date/)
    })
    it('should display corresponding values', () => {
      const positions = [
        {
          exchange: 'Poloniex',
          currency: 'BTC',
          amount: 100.98,
          price: 5097.23,
          percentChange: 0.13,
          purchaseDate: new Date('2015-09-18').getTime()
        },
        {
          exchange: 'Kraken',
          currency: 'ETH',
          amount: 0.98,
          price: 0.23,
          percentChange: -100.13,
          purchaseDate: new Date('2025-09-18').getTime()
        }
      ]
      const { component } = setup(positions)
          
      console.log(component.html())
      expect(component.html()).toMatch(/BTC.+100.98.+5097.23.+0.13.+2015\-09\-18.+ETH.+0.98.+0.23.+\-100.13.+2025\-09\-18/)
    })
    it('should display a "New position" button', () => {
      const { component } = setup()
      const matchedButtons = component.find('button').filterWhere(n => n.text() == 'New position');
      expect(matchedButtons.length).toEqual(1);
    })
  })
  /*describe('Transactions', () => {
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
  })*/
})
