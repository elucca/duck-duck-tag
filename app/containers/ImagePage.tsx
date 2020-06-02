import { connect } from 'react-redux';
import Image from '../components/Image';


function mapStateToProps(state) {
    return {
      configuration: state.configuration
    };
  }
  
const mapDispatchToProps = {}
  
export default connect(mapStateToProps, mapDispatchToProps)(Image)
  
