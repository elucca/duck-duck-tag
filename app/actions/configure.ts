import { GetState, Dispatch } from '../reducers/types';


const addConfiguration = ( configurationData ) => {



  return (dispatch: Dispatch) => {  
    dispatch( {
        type: 'SET',
        data:  configurationData 
      })
  }
}

export default addConfiguration