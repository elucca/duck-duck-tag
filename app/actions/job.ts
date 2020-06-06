import { GetState, Dispatch } from '../reducers/types';


const addJob = ( jobData ) => {

  return (dispatch: Dispatch) => {  
    dispatch( {
        type: 'SET_JOB',
        data:  jobData
      })
  }
}

export default addJob