import chai from '../../..//bower_components/chai/chai';
import chaiAsPromised from 'chai-as-promised';
import * as actions from './index'

let {expect} = chai;
chai.use(chaiAsPromised);

describe('Positions actions', () => {
  it('receivePositions should create RECEIVE_POSITIONS action', () => {
    expect(actions.receivePositions().type).to.equal('RECEIVE_POSITIONS')
    //expect(actions.receivePositions().type).toEqual('RECEIVE_POSITIONS')
  })

  /*it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('active')).toEqual({
      type: 'SET_VISIBILITY_FILTER',
      filter: 'active'
    })
  })

  it('toggleTodo should create TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1)).toEqual({
      type: 'TOGGLE_TODO',
      id: 1
    })
  })*/
})
