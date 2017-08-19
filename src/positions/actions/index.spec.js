import chai from '../../..//bower_components/chai/chai';
import chaiAsPromised from 'chai-as-promised';
import * as actions from './index'

let {expect} = chai;
chai.use(chaiAsPromised);

describe('Positions actions', () => {
  it('receivePositions should create RECEIVE_POSITIONS action', () => {
    expect(actions.receivePositions().type).to.equal('RECEIVE_POSITIONS')
    expect(actions.receivePositions().positions).to.be.an('array')
  })
})
