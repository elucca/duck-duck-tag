import { Dispatch } from '../reducers/types';


const setPathListing = ( pathListingData ) => {

  return (dispatch: Dispatch) => {  
    dispatch( {
        type: 'SET_PATHLISTING',
        data:  pathListingData
      })
  }
}

export default setPathListing