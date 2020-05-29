import { Action } from 'redux';
import services from '../constants/services.json';

const configuration = (state = services ,action) => {


  switch (action.type) {
  
    case 'SET':
      let alteredState = { ...state }
      alteredState[action.data.service] = action.data
      return alteredState

  }
  return state
}

export default configuration