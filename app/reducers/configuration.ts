import { Action } from 'redux';
 

const configuration = (state = {} ,action) => {


  switch (action.type) {
  
    case 'SET':
      let alteredState = { ...state }
      alteredState[action.data.service] = action.data
      return alteredState

  }
  return state
}

export default configuration