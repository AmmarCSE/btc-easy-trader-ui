import React from 'react'
import { mount } from 'enzyme'
import NewPosition from './NewPosition'

function setup(exchanges) {
  const component = mount(
    <NewPosition exchanges={exchanges}/>
  )

  return {
    component: component
  }
}

describe('NewPosition component', () => {
  it('should exist', () => {
    expect(NewPosition).toBeTruthy()
  })
  it('should have an exchange select element', () => {
    const { component } = setup()
    const matchedSelects = component.find('select[name="exchange"]');
    expect(matchedSelects.length).toEqual(1);
  })
  it('should have an exchange select element with values matching the passed in exchanges', () => {
    const exchanges = {
      'Poloniex': {
      },
      'Kraken': {
      },
      'Bittrex':{
      }
    }
    
    const { component } = setup(exchanges)
    for(let exchange in exchanges){
        const matchedOption = component.find(`select[name="exchange"] option[value="${exchange}"]`);
        expect(matchedOption.text()).toEqual(exchange);
    }
  })
  describe('market/currency elements', () => {
    it('should have a market select element', () => {
      const { component } = setup()
      const matchedSelects = component.find('select[name="market"]')
      expect(matchedSelects.length).toEqual(1)
    })
    it('should have a market select element with values belonging to selected exchange', () => {
      const exchanges = {
        'Poloniex': {
          markets: {
            BTC: [],
            USDT: []
          }
        },
        'Kraken': {
          markets: {
            ETH: [],
            BTC: [],
            XMR: []
          }
        },
        'Bittrex':{
          markets: {
            USD: []
          }
        }
      }
      
      const { component } = setup(exchanges)

      const exchangeSelect = component.find('select[name="exchange"]')
      const marketSelect = component.find('select[name="market"]')

      //expect(marketSelect.find('option').length).toEqual(0);
marketSelect.simulate('change',{target: { value : '100'}});
expect(marketSelect.props().value).toBe("100");
      for(let exchangeKey in exchanges){
        exchangeSelect.simulate('change', {target: { value : exchangeKey}});

          //console.log(exchangeSelect.find('[selected]'))
        const exchange = exchanges[exchangeKey]
        for(let market in exchange.markets){
          //expect(marketSelect.find(`option[value="${market}"]`).length).toEqual(1);
        }
      }
      /*for(let exchange in exchanges){
          const matchedOption = component.find(`select[name="exchange"] option[value="${exchange}"]`);
          expect(matchedOption.text()).toEqual(exchange);
      }*/
    })
    /*it('should have a currency select element', () => {
      const { component } = setup()
      const matchedSelects = component.find('select[name="currency"]');
      expect(matchedSelects.length).toEqual(1);
    })
    it('should have a currency select element with values belonging to the selected exchange', () => {
      let exchanges = {
        'Poloniex': {
          markets: {
            BTC: ['ETH', 'ETC', 'XRP'],
            USDT: ['BTC', 'ETH']
          }
        },
        'Kraken': {
          markets: {
            ETH: ['ETC'],
            BTC: ['BCH', 'ETH'],
            XMR: ['ZEC', 'DASH']
          }
        },
        'Bittrex':{
          markets: {
            USD: ['BTC', 'ETH']
          }
        }
      }
      const { component } = setup(exchanges)
      for(let exchange of exchanges){
          const matchedOption = component.find(`select[name="exchange"] option[value="${exchange}"]`);
          expect(matchedOption.text()).toEqual(exchange);
      }
    })*/
  })
  /*it('should have a type select element with values labels matching TRANSACTION_TYPES', () => {
    const { component } = setup()
    for(let transactionTypeKey in TRANSACTION_TYPES){
        const matchedOption = component.find(`select[name="type"] option[value="${TRANSACTION_TYPES[transactionTypeKey].code}"]`);
        expect(matchedOption.text()).toEqual(TRANSACTION_TYPES[transactionTypeKey].display);
    }
  })*/
})
