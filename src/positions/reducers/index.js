export default function(state = [], action) {
  switch (action.type) {
    case 'RECEIVE_POSITIONS':
      return action.positions
    default:
      return state
  }
}
