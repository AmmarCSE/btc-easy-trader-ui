import chai from '../../../bower_components/chai/chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from '../../../bower_components/sinon/lib/sinon';
import {testAsync} from '../../test-utils'
import { injectAsyncReducer, configureStore } from '../../store/configureStore';
import { requestPositions, receivePositions, fetchPositions } from './index'
import { getHttp } from '../../plugins/network-service'
import ENV from '../../env'

let {expect} = chai;
chai.use(chaiAsPromised);

describe('Positions actions', () => {
  it('requestPositions should create REQUEST_POSITIONS action', () => {
    expect(requestPositions().type).to.equal('REQUEST_POSITIONS')
  })
  it('receivePositions should create RECEIVE_POSITIONS action', () => {
    expect(receivePositions().type).to.equal('RECEIVE_POSITIONS')
    expect(receivePositions().positions).to.be.an('array')
  })
  describe('Fetching positions', () => {
    it('fetchPositions should make GET postions api request', done => {
      const store = configureStore()
      global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

      let requests = [];
      global.XMLHttpRequest.onCreate = function(xhr) {
        requests.push(xhr);
      }.bind(this);

      store.dispatch(fetchPositions())

      testAsync(()=> {
        let currentUrl = requests[0].url
        expect(currentUrl).to.equal(`${ENV.root}/positions`)
      }, done)

      global.XMLHttpRequest.restore();
    })
    it('fetchPositions should dispatch RECEIVE_POSITIONS action with positions response', done => {
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
      const store = configureStore()

      function testPositionsReducer(state = [], action){
        switch (action.type) {
          case 'RECEIVE_POSITIONS':
            expect(action.positions).to.deep.equal(positions)
            done()
          default:
            return state
        }
      }

      let spy = sinon.spy(testPositionsReducer)
      injectAsyncReducer(store, 'test-positions', testPositionsReducer);

      global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

      global.XMLHttpRequest.onCreate = function(xhr) {
        //make sure action still hasn't been dispatched
        testAsync(()=> expect( spy.calledOnce ).to.equal( false ))

        //simulate response
        setTimeout(()=>{
          xhr.response = {positions}
          xhr.status = 200
          xhr.readyState = XMLHttpRequest.DONE
          xhr.onreadystatechange()
        })
      }.bind(this);

      store.dispatch(fetchPositions())

      //reducer was not called
      //automatic fail
      testAsync(()=> expect(false).to.equal( true ), done, 1000)

      global.XMLHttpRequest.restore();
    })
  })
})

/*import {getHttp, postHttp, putHttp, deleteHttp} from '../../app/network-service';

describe('Network service', () => {
  beforeEach(function() {
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

    this.requests = [];
    global.XMLHttpRequest.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);

    //since we are stubing the XMLHttpRequest, the url doesnt matter
    this.url = 'someUrl.com';
  });

  afterEach(() => {
    global.XMLHttpRequest.restore();
  });

  describe('get HTTP', function () {
    it('getHttp should exist', function () {
        assert.notEqual(!!getHttp, false);
    });
    it('getHttp should return a promise', function () {
      let getHttpResult = getHttp(this.url);

      expect(getHttpResult).to.be.an.instanceof(Promise);
    });
    describe('getting HTTP request', function () {
      it('should attach query string when parameters are passed', function () {
        let params = { param1: 'one', param2:'two' };
        let data = { 'foo': 'bar' };
        let dataJson = JSON.stringify(data);

        setTimeout(function(){ 
          this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson) 
        }.bind(this), 0);

        return getHttp(this.url, params)
          .then(function(){
            let currentUrl = this.requests[0].url;
            expect(currentUrl).to.have.string('param1=one');
            expect(currentUrl).to.have.string('param2=two');
          }.bind(this));
      });
      it('should get JSON object', function () {
        let data = { 'foo': 'bar' };
        let dataJson = JSON.stringify(data);

        setTimeout(function(){ 
          this.requests[0].respond(200, { 'Content-Type': 'application/json' }, dataJson) 
        }.bind(this), 0);

        return getHttp(this.url)
          .then(result => {
            expect(result).to.deep.equal(data);
          });
      });
    });
  });

/*export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}*/
