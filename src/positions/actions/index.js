//import {ajax} from '../../utils/utils'
import { getRootHttp } from '../../plugins/network-service'
import ENV from '../../env'

export const RECEIVE_POSITIONS = 'RECEIVE_POSITIONS'
export const REQUEST_POSITIONS = 'REQUEST_POSITIONS'

export function requestPositions() {
  return {
    type: REQUEST_POSITIONS
  }
}

export function receivePositions(positions = []) {
  return {
    type: RECEIVE_POSITIONS,
    positions
  }
}

export function fetchPositions(){
  return dispatch => {
    getRootHttp('positions')
      .then(result => {
        dispatch(receivePositions(result.positions))
      })
  }
}
