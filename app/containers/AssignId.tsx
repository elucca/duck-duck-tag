import { connect } from 'react-redux';
import conjureId from '../utils/assignId'
import incrementId from '../actions/assignId'



function mapStateToProps(state) {
    return {
      imageId: state.imageId
    };
  }
  
const mapDispatchToProps = {
    incrementId
}


export default connect(mapStateToProps, mapDispatchToProps)(conjureId)