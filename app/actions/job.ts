import { GetState, Dispatch } from '../reducers/types';


const setJob = ( jobData ) => {

  return (dispatch: Dispatch) => {  
    dispatch( {
        type: 'SET_JOB',
        data:  jobData
      })
  }
}

export default setJob