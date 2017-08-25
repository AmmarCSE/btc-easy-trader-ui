import { connect } from 'react-redux'
import PositionsView from '../components/PositionsView'

const mapStateToProps = (state) => {
  const { positions } = state

  return { positions }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const Positions = connect(
  mapStateToProps,
  mapDispatchToProps
)(PositionsView)

export default Positions
