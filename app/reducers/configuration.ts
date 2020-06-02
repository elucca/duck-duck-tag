import { Action } from 'redux';
import services from '../constants/services.json';



const servicesArrayToConfigObject = servicesArray => {
    let object = {}

    let service 
    for (let serviceIndex in services) {
      service = services[serviceIndex]
      object[service.name] = { ...service }
    }

    return object

}

const configuration = (state = servicesArrayToConfigObject(services) ,action) => {


  switch (action.type) {
  
    case 'SET':
      let alteredState = { ...state }
      alteredState[action.data.name] = action.data
      return alteredState

  }
  return state
}

export default configuration