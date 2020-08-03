import getId from '../utils/getId'

const defaultListing = [
    { type: 'url', path: 'https://picsum.photos/id/256/200/200.jpg', selected: true, id: getId() }
]

const pathListing = (state = defaultListing, action) => {
    
    switch (action.type) {
        case 'SET_PATHLISTING':
          return action.data
      }

    return state
}

export default pathListing