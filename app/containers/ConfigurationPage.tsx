import { connect } from 'react-redux';
import Configuration from '../components/Configuration';
import addConfiguration from '../actions/configure';
import { counterStateType } from '../reducers/types';



function mapStateToProps(state: counterStateType) {
    return {
      counter: state.counter
    };
  }
  
const mapDispatchToProps = {
    addConfiguration
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Configuration)
  
