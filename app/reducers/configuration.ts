import { Action } from 'redux';
import services from '../constants/services.json';



const servicesArrayToConfigObject = servicesArray => {
    const object = {}

    let service 
    for (const serviceIndex in servicesArray) {
      service = servicesArray[serviceIndex]
      object[service.name] = { ...service }
    }

    return object

}

const configuration = (state = servicesArrayToConfigObject(services) ,action) => {


  let alteredState

  switch (action.type) {
  
    case 'SET':
      alteredState = { ...state }
      alteredState[action.data.name] = action.data
      return alteredState

  }
  return state
}

export default configuration