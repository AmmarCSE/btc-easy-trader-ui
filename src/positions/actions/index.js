//import {ajax} from '../../utils/utils'

export const RECEIVE_POSITIONS = 'RECEIVE_POSITIONS'

export function receivePositions(positions = []) {
  return {
    type: RECEIVE_POSITIONS,
    positions
  }
}
