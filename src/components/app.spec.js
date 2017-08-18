import assert from 'assert';
import chai from '../..//bower_components/chai/chai';
import sinon from '../../bower_components/sinon/lib/sinon';
import chaiAsPromised from 'chai-as-promised';

let {expect} = chai;
chai.use(chaiAsPromised);

describe('Watani App', function () {
  describe('Authentication', function () {
    it('needs to prompt authentication', function () {
      browser.ignoreSynchronization = true;
      browser.get('http://localhost:3000/index.html#');

      expect(element(by.css('#root')).isDisplayed()).to.eventually.equal(true); 
    });
  });
});
