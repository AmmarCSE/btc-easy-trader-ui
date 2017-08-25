export function positionsReducer(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_POSITIONS':
      return action.positions
    default:
      return state
  }
}
