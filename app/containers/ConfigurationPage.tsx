import { connect } from 'react-redux';
import Configuration from '../components/Configuration';
import addConfiguration from '../actions/configure';


function mapStateToProps(state) {
    return {
      configuration: state.configuration
    };
  }
  
const mapDispatchToProps = {
    addConfiguration
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Configuration)
  
