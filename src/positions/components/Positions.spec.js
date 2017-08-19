import assert from 'assert';
import chai from '../../..//bower_components/chai/chai';
import sinon from '../../../bower_components/sinon/lib/sinon';
import chaiAsPromised from 'chai-as-promised';

let {expect} = chai;
chai.use(chaiAsPromised);

describe('BTC Easy Trader App', function () {
  beforeEach(function(){
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:3000/index.html#');
  })
  describe('Positions', function () {
    it('should exist', () => {
      expect(element(by.css('#PositionsView')).isDisplayed()).to.eventually.equal(true); 
    })
  })
  describe('Positions View', () => {
    it('should display Positions', (done) => {
      element(by.css('#PositionsView')).getText().then(function(text) { 
        expect(/^Positions/.test(text)).to.equal(true)
        done();
      });
    })
    it('should display headers', (done) => {
      element(by.css('#PositionsView')).getText().then(function(text) { 
        console.log(text)
        expect(/Exchange.+Currency.+Amount.+Price.+\% Change.+Date/.test(text)).to.equal(true)
        done();
      });
    })
    /*it('should display corresponding values', () => {
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
          
      expect(component.html()).toMatch(/BTC.+100.98.+5097.23.+0.13.+2015\-09\-18.+ETH.+0.98.+0.23.+\-100.13.+2025\-09\-18/)
    })
    it('should display a "New position" button', () => {
      const { component } = setup()
      const matchedButtons = component.find('button').filterWhere(n => n.text() == 'New position');
      expect(matchedButtons.length).toEqual(1);
    })*/
  })
});
