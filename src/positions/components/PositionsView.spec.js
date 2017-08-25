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
        expect(/Exchange.+Currency.+Amount.+Price.+\% Change.+Date/.test(text)).to.equal(true)
        done();
      });
    })
    it('should display corresponding values', done => {
      element(by.css('#PositionsView')).getText().then(function(text) { 
        console.log(text)
        expect(/BTC.+100.98.+5097.23.+0.13.+2015\-09\-18(.|\s)+ETH.+0.98.+0.23.+\-100.13.+2025\-09\-18/.test(text)).to.equal(true)
        done();
      });
    })
    it('should display a "New position" button', done => {
      expect(element(by.css('#PositionsView')).isDisplayed()).to.eventually.equal(true); 
      element(by.css('button')).getText().then(function(text) { 
        console.log(text)
        expect(/New position/.test(text)).to.equal(true)
        done();
      });
    })
  })
});
