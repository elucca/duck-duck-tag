import { connect } from 'react-redux';
import Image from '../components/Image';
import setJob from '../actions/job'

// Subscribe to redux state (get both configuration and job)
// Transform current store state into props for Image
function mapStateToProps(state) {
    return {
      configuration: state.configuration,
      job: state.job
    };
  }
  
// Dispatch redux action creator setJob
// Receive a dispatch and return a callback props setJob (could not have guessed this)
const mapDispatchToProps = {
  setJob
}
  
/* connect from react-redux actually generates a container component using the above functions.
The container component could be written by hand, using store.subscribe().
It is however recommended to generate the component with connect, since it offers performance optimizations.
*/
export default connect(mapStateToProps, mapDispatchToProps)(Image)
  
