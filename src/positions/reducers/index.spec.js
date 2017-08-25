import chai from '../../..//bower_components/chai/chai';
import chaiAsPromised from 'chai-as-promised';
import {positionsReducer} from './index'

let {expect} = chai;
chai.use(chaiAsPromised);

describe('positions reducer', () => {
  it('should handle initial state', () => {
    expect(positionsReducer(undefined, {})).to.deep.equal([])
  })

  it('should handle RECEIVE_POSITIONS', () => {
    expect(
      positionsReducer([], {
        type: 'RECEIVE_POSITIONS',
        positions: [
          {
            exchange: 'Poloniex',
            currency: 'BTC',
            amount: 100.98,
            price: 5097.23,
            percentChange: 0.13,
            purchaseDate: new Date('2015-09-18').getTime()
          }
        ]
      })
    ).to.deep.equal([
      {
        exchange: 'Poloniex',
        currency: 'BTC',
        amount: 100.98,
        price: 5097.23,
        percentChange: 0.13,
        purchaseDate: new Date('2015-09-18').getTime()
      }
    ])

    expect(
      positionsReducer([], {
        type: 'RECEIVE_POSITIONS',
        positions: [
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
      })
    ).to.deep.equal([
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
    ])
  })
})
